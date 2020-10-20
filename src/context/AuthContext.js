import React from 'react';

function plug() {}

export const AuthContext = React.createContext({
    auth: plug, 
    token: null, 
    login: plug, 
    logout: plug 
})