import React from "react";
import classes from "./Header.module.scss";
import classNames from "classnames";
import { Link, Route } from "react-router-dom";

const Header = ({ logout, removeFilters }) => {
    const logoutHandler = () => {
        removeFilters();
        logout();
    };

    return (
        <div className={classNames(classes.Header, "container")}>
            <Route exact path="/pokemon/:id">
                <Link to="/">&lt; Back</Link>
            </Route>
            <button type="button" onClick={logoutHandler}>
                Logout
            </button>
        </div>
    );
};

export default Header;
