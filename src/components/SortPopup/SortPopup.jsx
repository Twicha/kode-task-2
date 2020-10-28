import React from "react";
import classes from "./SortPopup.module.scss";
import classNames from "classnames";
import arrow from "./arrow.svg";
import notFoundImg from "./notFound.png";

const SortPopup = ({
    label = "label",
    list,
    onClickSortPopup,
    activeSortPopupItem,
    resetFilter,
    selectedFilter,
    loading,
}) => {
    const [visible, setVisible] = React.useState(false);
    const sortPopupRef = React.useRef();
    const [searchValue, setSearchValue] = React.useState("");
    const [notFound, setNotFound] = React.useState(false);
    const [searchedList, setSearchedList] = React.useState([...list]);

    React.useEffect(() => {
        document.body.addEventListener("click", handleOutsideClick);

        return () => {
            document.body.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    const visibleToggle = () => {
        searchValueDelete();
        setVisible((prev) => {
            return !prev;
        });
    };

    const handleOutsideClick = (e) => {
        const path = e.path || (e.composedPath && e.composedPath());

        if (!path.includes(sortPopupRef.current)) {
            setVisible(false);
            searchValueDelete();
        }
    };

    const sortPopupHandler = (value) => {
        visibleToggle();
        onClickSortPopup(value);
    };

    const onChangeSearchHandler = (e) => {
        if (!e.target.value.trim("")) {
            searchValueDelete();

            return;
        }

        let posts = [
            ...list.filter((item) => {
                return item.toLowerCase().includes(e.target.value.toLowerCase());
            }),
        ];

        setNotFound(posts.length > 0 ? false : true);
        setSearchValue(e.target.value);
        setSearchedList(posts);
    };

    const searchValueDelete = () => {
        setSearchValue("");
        setNotFound(false);
        setSearchedList(list);
    };

    const resetFilterHandler = () => {
        resetFilter(null);
    };

    if (loading) {
        return (
            <div className={classNames(classes.SortPopupWrap, loading ? classes.Loading : null)}>
                <div className={classNames(classes.SortPopup__Label)}>
                    <span></span>
                    <div></div>
                </div>
            </div>
        );
    }

    return (
        <div ref={sortPopupRef} className={classes.SortPopupWrap}>
            <div
                className={classNames(
                    classes.SortPopup__Label,
                    visible ? classes.Visible : null
                )}
                onClick={visibleToggle}
            >
                <span>{activeSortPopupItem ? activeSortPopupItem : label}</span>
                <div style={{ backgroundImage: `url(${arrow})` }}></div>
            </div>
            {selectedFilter && !visible && (
                <button
                    onClick={resetFilterHandler}
                    className={classes.SortPopup__ResetFilter}
                >
                    Reset filter
                </button>
            )}
            {visible && (
                <div className={classes.SortPopup}>
                    <div className={classes.SortPopup__Search}>
                        <input
                            value={searchValue}
                            type="text"
                            placeholder="Type something..."
                            onChange={onChangeSearchHandler}
                        />
                    </div>
                    <ul className={classes.SortPopup__List}>
                        {searchedList.sort().map((item, index) => {
                            return (
                                <li
                                    key={`${item}_${index}`}
                                    className={
                                        item === activeSortPopupItem
                                            ? classes.Active
                                            : null
                                    }
                                    onClick={() => sortPopupHandler(item)}
                                >
                                    {item}
                                </li>
                            );
                        })}
                    </ul>
                    {notFound && (
                        <div className={classes.SortPopup__NotFound}>
                            <p>{label} not found...</p>
                            <img src={notFoundImg} alt="not found" />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SortPopup;
