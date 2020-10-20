import React from "react";
import classes from "./Auth.module.scss";
import { FormControl, Message } from "../../components";
import arrow from "./arrow.svg";
import { AuthContext } from "../../context/AuthContext";

const smsCode = "123456";

const Auth = () => {
    const { auth, login } = React.useContext(AuthContext);

    const [authData, setAuthData] = React.useState({
        email: "",
        password: "",
    });
    const [submitted, setSubmitted] = React.useState(false);
    const [isConfirmation, setConfirmation] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [responseData, setResponseData] = React.useState(null);

    const changeHanler = (e) => {
        setAuthData({
            ...authData,
            [e.target.name]: e.target.value,
        });
    };

    const authHandler = (e) => {
        e.preventDefault();

        setSubmitted(true);
        setError(false);

        if (isConfirmation) {
            if (smsCode === authData.confirmation) {
                setSubmitted(false);
                login(responseData);
            } else {
                setSubmitted(false);
                setError(true);
            }
        } else {
            const user = {
                ...authData,
                returnSecureToken: true,
            };

            auth(user)
                .then((res) => {
                    setSubmitted(false);

                    if (res.status === 200) {
                        setResponseData({ ...res });
                        setConfirmation(true);
                        setAuthData({
                            confirmation: "",
                        });
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setError(true);
                    setSubmitted(false);
                });
        }
    };

    const confirmationControl = (
        <FormControl
            label="Code from SMS"
            id="confirmation"
            name="confirmation"
            type="text"
            placeholder="Введите код подтверждения из SMS..."
            value={authData.confirmation}
            disabled={submitted}
            onChange={changeHanler}
        />
    );

    const loginControls = (
        <React.Fragment>
            <FormControl
                label="E-mail"
                id="email"
                name="email"
                type="text"
                placeholder="Введите E-mail..."
                value={authData.email}
                disabled={submitted}
                onChange={changeHanler}
            />
            <FormControl
                label="Password"
                id="password"
                name="password"
                type="password"
                placeholder="Введите пароль..."
                value={authData.password}
                disabled={submitted}
                onChange={changeHanler}
            />
        </React.Fragment>
    );

    return (
        <div className={classes.Auth}>
            <form>
                {isConfirmation ? confirmationControl : loginControls}
                {error && (
                    <Message
                        background="red"
                        color="white"
                        message="Вы ввели некорректные данные..."
                    />
                )}
                <button
                    type="submit"
                    disabled={submitted}
                    style={{ backgroundImage: `url(${arrow})` }}
                    onClick={authHandler}
                ></button>
            </form>
        </div>
    );
};

export default Auth;
