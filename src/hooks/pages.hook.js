import React from "react";
import { useScroll } from "./scroll.hook";

export const usePages = ({ location }) => {
    const { scrollTop } = useScroll();
    const [pages, setPages] = React.useState({
        page: !!new URLSearchParams(location.search).get("page")
            ? +new URLSearchParams(location.search).get("page")
            : 1,
        totalPages: null,
        pageSize: !!new URLSearchParams(location.search).get("pageSize")
            ? +new URLSearchParams(location.search).get("pageSize")
            : 10,
        types: !!new URLSearchParams(location.search).get("types")
            ? new URLSearchParams(location.search).get("types")
            : null,
        subtype: !!new URLSearchParams(location.search).get("subtype")
            ? new URLSearchParams(location.search).get("subtype")
            : null,
        canUse: !!location.search ? true : false,
    });

    const getTotalPage = (totalPages) => {
        setPages((prev) => {
            return {
                ...prev,
                totalPages: totalPages,
            };
        });
    };

    const setCurrentPageToStart = () => {
        setPages((prev) => {
            return {
                ...prev,
                page: 1,
            };
        });
    };

    const setTypes = (types) => {
        setPages((prev) => {
            return {
                ...prev,
                types: types,
                canUse: true,
            };
        });
    };

    const setSubtype = (subtype) => {
        setPages((prev) => {
            return {
                ...prev,
                subtype: subtype,
                canUse: true,
            };
        });
    };

    const pressPage = (pageNumber = 1) => {
        scrollTop();
        setPages((prev) => {
            return {
                ...prev,
                page: pageNumber,
                canUse: true,
            };
        });
    };

    const removeFilters = () => {
        setPages((prev) => {
            return {
                ...prev,
                page: 1,
                pageSize: 10,
                types: "",
                subtype: "",
                canUse: false,
                totalPages: null,
            };
        });
    };

    return {
        pages,
        getTotalPage,
        pressPage,
        setTypes,
        setSubtype,
        setCurrentPageToStart,
        removeFilters,
    };
};
