import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router-dom";

const smsCode = "123456";

export const useForm = () => {
    const history = useHistory();
    const { auth, login } = React.useContext(AuthContext);
    const [responseData, setResponseData] = React.useState(null);
    const [form, setForm] = React.useState({
        submitted: false,
        isError: "",
        email: {
            isTouched: false,
            isInvalid: "",
            value: "",
        },
        password: {
            isTouched: false,
            isInvalid: "",
            value: "",
        },
        confirmation: {
            isConfirmation: false,
            isTouched: false,
            isInvalid: "",
            value: "",
        },
    });

    const changeHandler = (e) => {
        e.persist();

        setForm((prev) => {
            return {
                ...prev,
                isError: "",
                [e.target.name]: {
                    ...prev[e.target.name],
                    value: e.target.value,
                },
            };
        });

        validateField(e.target.name, e.target.value);
    };

    const touchInputHandler = (e) => {
        e.persist();

        setForm((prev) => {
            return {
                ...prev,
                [e.target.name]: {
                    ...prev[e.target.name],
                    isTouched: true,
                },
            };
        });

        validateField(e.target.name, e.target.value);
    };

    const validateField = (fieldName, value) => {
        let isInvalid;

        const setIsInvalidInput = () => {
            setForm((prev) => {
                return {
                    ...prev,
                    [fieldName]: {
                        ...prev[fieldName],
                        isInvalid: isInvalid,
                    },
                };
            });
        };

        if (!value.trim("")) {
            isInvalid = "This field is required...";

            setIsInvalidInput();

            return;
        }

        switch (fieldName) {
            case "email":
                isInvalid = !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                    String(value).toLowerCase()
                )
                    ? "Type correct E-mail..."
                    : "";

                break;
            case "password":
                isInvalid =
                    // вообще при авторизации не следует валидировать на длинну,
                    // т.к. потенциальные взломщики буду знать, что пароль длиннее
                    // конкретного значения, но для примера пусть будет
                    value.length < 6 ? "Password must be at least 6 characters..." : "";
                break;
            default:
                break;
        }

        setIsInvalidInput();
    };

    const checkForRequired = (formControl, value) => {
        setForm((prev) => {
            return {
                ...prev,
                [formControl]: {
                    ...prev[formControl],
                    isTouched: true,
                    isInvalid: value
                }
            }
        })
    }

    const authHandler = (e) => {
        e.preventDefault();

        if (form.confirmation.isConfirmation) {
            if (!form.confirmation.value.trim("")) {
                checkForRequired('confirmation', 'This field is required...');
                console.log(3);

                return;
            }
        } else {
            if (!form.email.value.trim("")) {
                checkForRequired('email', 'This field is required...');

                console.log(1);

                return;
            } else if (!form.password.value.trim("")) {
                checkForRequired('password', 'This field is required...');
                console.log(2);
                
                return;
            }
        }

        setForm((prev) => {
            return {
                ...prev,
                submitted: true,
                isError: "",
                email: {
                    ...prev.email,
                    isInvalid: "",
                    isTouched: false,
                },
                password: {
                    ...prev.password,
                    isInvalid: "",
                    isTouched: false,
                },
                confirmation: {
                    ...prev.confirmation,
                    isInvalid: "",
                    isTouched: false,
                },
            };
        });

        if (form.confirmation.isConfirmation) {
            if (smsCode === form.confirmation.value) {
                setForm((prev) => {
                    return {
                        ...prev,
                        submitted: false,
                    };
                });
                login(responseData);
                history.push("/");
            } else {
                setForm((prev) => {
                    return {
                        ...prev,
                        submitted: false,
                        isError: "You typed incorrect verification code...",
                    };
                });
            }
        } else {
            const user = {
                email: form.email.value,
                password: form.password.value,
                returnSecureToken: true,
            };

            auth(user)
                .then((res) => {
                    setForm((prev) => {
                        return {
                            ...prev,
                            submitted: false,
                        };
                    });

                    if (res.status === 200) {
                        setResponseData({ ...res });
                        setForm((prev) => {
                            return {
                                ...prev,
                                confirmation: {
                                    ...prev.confirmation,
                                    isConfirmation: true,
                                },
                            };
                        });
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setForm((prev) => {
                        return {
                            ...prev,
                            submitted: false,
                            isError: "You typed incorrect data...",
                        };
                    });
                });
        }
    };

    return { form, changeHandler, touchInputHandler, authHandler };
};
