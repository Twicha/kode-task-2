import React from "react";

function plug() {}

export const AuthContext = React.createContext({
    prevPage: null,
    currentPage: 1,
    nextPage: 2,
    totalPages: null,
    pageSize: 10,
    getPagesInfo: plug,
});
