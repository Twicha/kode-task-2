import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Auth, Home, NotFound, SinglePokemon } from "./pages";

export const useRoutes = (isAuth) => {
    if (isAuth) {
        return (
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/pokemon/:id" exact component={SinglePokemon} />
                <Route path="/404" exact component={NotFound} />
                <Redirect to="/" />
            </Switch>
        );
    }

    return (
        <Switch>
            <Route path="/auth" exact>
                <Auth />
            </Route>
            <Redirect to="/auth" />
        </Switch>
    );
};
