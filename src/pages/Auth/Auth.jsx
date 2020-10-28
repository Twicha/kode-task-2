import React from "react";
import classes from "./Auth.module.scss";
import { FormControl, Loader, Message } from "../../components";
import arrow from "./arrow.svg";
import { useForm } from "../../hooks/form.hook";

const Auth = () => {
    const { form, changeHandler, touchInputHandler, authHandler } = useForm();

    React.useEffect(() => {
        document.title = "Pokemon | Auth";
    }, []);

    const confirmationControl = (
        <FormControl
            label="Code from SMS"
            id="confirmation"
            name="confirmation"
            type="text"
            placeholder="Type the verification code from SMS..."
            value={form.confirmation.value}
            disabled={form.submitted}
            onChange={changeHandler}
            onBlur={touchInputHandler}
            isTouched={form.confirmation.isTouched}
            isInvalid={form.confirmation.isInvalid}
        />
    );

    const loginControls = (
        <React.Fragment>
            <FormControl
                label="E-mail"
                id="email"
                name="email"
                type="text"
                placeholder="Type E-mail..."
                value={form.email.value}
                disabled={form.submitted}
                onChange={changeHandler}
                onBlur={touchInputHandler}
                isTouched={form.email.isTouched}
                isInvalid={form.email.isInvalid}
            />
            <FormControl
                label="Password"
                id="password"
                name="password"
                type="password"
                placeholder="Type password..."
                value={form.password.value}
                disabled={form.submitted}
                onChange={changeHandler}
                onBlur={touchInputHandler}
                isTouched={form.password.isTouched}
                isInvalid={form.password.isInvalid}
            />
        </React.Fragment>
    );

    return (
        <div className={classes.Auth}>
            <div className={classes.FormWrapper}>
                <form>
                    {form.confirmation.isConfirmation
                        ? confirmationControl
                        : loginControls}
                    {!!form.isError && (
                        <Message
                            background="tomato"
                            color="white"
                            message={form.isError}
                        />
                    )}
                    <button
                        type="submit"
                        disabled={form.submitted}
                        style={{ backgroundImage: `url(${!form.submitted && arrow})` }}
                        onClick={authHandler}
                    >
                        {form.submitted && <Loader />}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Auth;
