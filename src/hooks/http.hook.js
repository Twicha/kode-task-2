import React from "react";

export const useHttp = () => {
    const request = React.useCallback(
        async (url) => {
            try {
                return await fetch(
                    `https://api.pokemontcg.io/v1/${url}`
                );
            } catch (e) {}
        },
        []
    );

    return { request };
};
