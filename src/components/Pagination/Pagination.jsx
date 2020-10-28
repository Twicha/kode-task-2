import React from "react";
import classes from "./Pagination.module.scss";

const Pagination = ({ pages, pressPage, className }) => {
    const [morePagination, setMorePagination] = React.useState(document.documentElement.clientWidth > 660);

    const followResizeHandler = () => {
        console.log(1);
        if (document.documentElement.clientWidth > 900) {
            setMorePagination(true);
        } else {
            setMorePagination(false);
        }
    }

    React.useEffect(() => {
        window.addEventListener('resize', followResizeHandler);
        
        return () => {
            window.removeEventListener('resize', followResizeHandler);
        }
    }, []);

    const paginationItem = (pageValue, disc) => {
        const pressPaginationItem = () => {
            pressPage(pageValue);
        };

        return (
            <span className={className} onClick={pressPaginationItem}>
                {disc ? disc : pageValue}
            </span>
        );
    };

    // сделал так, а не так "const { page, totalPages } = pages;",
    // потому что при старте страницы с параметрами поиска в url
    // адресе данная конструкция в pagination хуке парсит строку
    // и на выходе все "value" - это строки, и по этому я решил сделать
    // тут такой простенький "костылёк", если это можно так назвать
    // new URLSearchParams(location.search).forEach(function (value, key) {
    //     setPages((prev) => {
    //         return {
    //             ...prev,
    //             [key]: value,
    //             canUse: true,
    //         }
    //     })
    // });

    const page = +pages.page;
    const totalPages = +pages.totalPages;

    if (!morePagination) {
        return (
            <div className={classes.Pagination}>
                {page - 1 > 0 && paginationItem(page - 1, "<")}
                {page - 2 > 0 && paginationItem(1)}
                {page - 2 > 1 && <span className={classes.Pagination__Plug}>...</span>}
                {page - 1 > 0 && paginationItem(page - 1)}
                <span className={classes.Pagination__CurrentPage}>{page}</span>
                {page + 1 < totalPages && paginationItem(page + 1)}
                {page + 2 < totalPages && (
                    <span className={classes.Pagination__Plug}>...</span>
                )}
                {page < totalPages && paginationItem(totalPages)}
                {page < totalPages && paginationItem(page + 1, ">")}
            </div>
        );
    }

    return (
        <div className={classes.Pagination}>
            {page - 1 > 0 && paginationItem(page - 1, "< Prev")}
            {page - 3 > 0 && paginationItem(1)}
            {page - 3 > 1 && <span className={classes.Pagination__Plug}>...</span>}
            {page - 2 > 0 && paginationItem(page - 2)}
            {page - 1 > 0 && paginationItem(page - 1)}
            <span className={classes.Pagination__CurrentPage}>{page}</span>
            {page + 1 < totalPages && paginationItem(page + 1)}
            {page + 2 < totalPages && paginationItem(page + 2)}
            {page + 3 < totalPages && (
                <span className={classes.Pagination__Plug}>...</span>
            )}
            {page < totalPages && paginationItem(totalPages)}
            {page < totalPages && paginationItem(page + 1, "Next >")}
        </div>
    );
};

export default Pagination;
