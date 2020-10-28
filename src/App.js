import React from "react";
import classes from "./App.module.scss";
import classNames from "classnames";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { PagesContext } from "./context/PagesContext";
import { Header } from "./components";
import { usePages } from "./hooks/pages.hook";
import { useRoutes } from "./routes";

function App() {
    const {
        pages,
        getTotalPage,
        pressPage,
        setSubtype,
        setTypes,
        setCurrentPageToStart,
        removeFilters,
    } = usePages({ location: window.location });
    const { auth, token, login, logout } = useAuth();
    const isAuth = !!token;
    const routes = useRoutes(isAuth);

    return (
        <AuthContext.Provider value={{ auth, isAuth, login, logout }}>
            <PagesContext.Provider
                value={{
                    pages,
                    getTotalPage,
                    pressPage,
                    setSubtype,
                    setTypes,
                    setCurrentPageToStart,
                    removeFilters,
                }}
            >
                <div className={classNames(classes.App)}>
                    {isAuth && <Header removeFilters={removeFilters} logout={logout} />}
                    {routes}
                </div>
            </PagesContext.Provider>
        </AuthContext.Provider>
    );
}

export default App;
