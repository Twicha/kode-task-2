import Axios from "axios";
import React from "react";
import { useHistory } from "react-router-dom";

export const useAuth = () => {
    const [token, setToken] = React.useState(null);

    React.useEffect(() => {
        const expIn = localStorage.getItem("tokenLifeSpan");

        if ((new Date()).toString() > expIn) {
            logout();
        } else {
            setToken(localStorage.getItem("authToken"));
        }
    }, []);

    const login = React.useCallback((response = null) => {
        if (response) {
            const expDate = new Date(
                new Date().getTime() + +response.data.expiresIn * 1000
            ).toString();

            setToken(response.data.idToken);

            localStorage.setItem("authToken", response.data.idToken);
            localStorage.setItem("tokenLifeSpan", expDate);
        } else {
            localStorage.clear();
        }
    }, []);

    const logout = React.useCallback(() => {
        login(null);
        setToken(null);
    }, []);

    const auth = React.useCallback(async (user) => {
        return await Axios.post(
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBbWQUFTxafb_R3bFw8Cj5RXsE_fKlSB4E",
            user
        );
    }, []);

    return { auth, token, login, logout };
};
