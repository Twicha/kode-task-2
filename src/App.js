import React from "react";
import classes from "./App.module.scss";
import classNames from "classnames";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { useRoutes } from "./routes";
import { Header } from "./components";

function App() {
    const { auth, token, login, logout } = useAuth();
    const isAuth = !!token;
    const routes = useRoutes(isAuth);

    console.log(isAuth);

    return (
        <AuthContext.Provider value={{ auth, isAuth, login, logout }}>
            <div className={classNames(classes.App)}>
                {isAuth && <Header />}
                {routes}
            </div>
        </AuthContext.Provider>
    );
}

export default App;
