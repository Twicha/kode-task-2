import React from "react";

function plug() {}

export const PagesContext = React.createContext({
    pages: {},
    getTotalPage: plug,
    pressPage: plug,
    setSubtype: plug,
    setTypes: plug,
    setCurrentPageToStart: plug,
    removeFilters: plug,
});
