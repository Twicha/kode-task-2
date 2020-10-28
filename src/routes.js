import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Auth, Home, NotFound, SinglePokemon } from "./pages";

export const useRoutes = (isAuth) => {
    if (isAuth) {
        return (
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/pokemon/:id" component={SinglePokemon} />
                <Route path="*" exact component={NotFound} />
            </Switch>
        );
    }

    return (
        <Switch>
            <Route path="/auth" exact component={Auth} />
            <Redirect to="/auth" />
        </Switch>
    );
};
