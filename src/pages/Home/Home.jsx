import React from "react";
import classes from "./Home.module.scss";
import classNames from "classnames";
import { Pagination, PokemonCard, SortPopup } from "../../components";
import { useHttp } from "../../hooks/http.hook";
import { PagesContext } from "../../context/PagesContext";
import { useHistory } from "react-router-dom";
import { useScroll } from "../../hooks/scroll.hook";
import QuickView from "../../components/QuickView/QuickView";

const Home = () => {
    const homeRef = React.useRef();
    const asideOffsetTopRef = React.useRef();
    const history = useHistory();
    const { scrollTop } = useScroll();
    const { request } = useHttp();
    const {
        pages,
        getTotalPage,
        pressPage,
        setSubtype,
        setTypes,
        setCurrentPageToStart,
        removeFilters,
    } = React.useContext(PagesContext);
    const [pokemons, setPokemons] = React.useState([]);
    const [loading, setLoading] = React.useState({
        cards: false,
        types: true,
        subtypes: true,
        pagination: false,
    });
    const [fixedBar, setFixedBar] = React.useState(false);
    const [pokemon, setPokemon] = React.useState(null);
    const [typeArr, setTypeArr] = React.useState([]);
    const [subtypeArr, setSubtypeArr] = React.useState([]);

    React.useEffect(() => {
        document.title = "Pokemon | Home";

        request(`/types`).then(async (response) => {
            const data = await response.json();

            setTypeArr([...data.types]);
            setLoading((prev) => {
                return {
                    ...prev,
                    types: false,
                };
            });
        });

        request(`/subtypes`).then(async (response) => {
            const data = await response.json();

            setSubtypeArr([...data.subtypes]);
            setLoading((prev) => {
                return {
                    ...prev,
                    subtypes: false,
                };
            });
        });

        asideOffsetTopRef.current = homeRef.current.offsetTop;

        document.addEventListener("scroll", asidePositionHandler);

        return () => {
            document.removeEventListener("scroll", asidePositionHandler);
        };
    }, []);

    React.useEffect(() => {
        if (pages.canUse) {
            let url = new URLSearchParams("");

            !!pages.page && url.append("page", pages.page);
            !!pages.pageSize && url.append("pageSize", pages.pageSize);
            !!pages.types && url.append("types", pages.types);
            !!pages.subtype && url.append("subtype", pages.subtype);

            url = `/?${url}`;

            history.push(url);
        }

        setLoading((prev) => {
            return {
                ...prev,
                cards: true,
            };
        });

        request(
            `cards?page=${pages.page}&pageSize=${pages.pageSize}${
                !pages.types ? "" : `&types=${pages.types}`
            }${!pages.subtype ? "" : `&subtype=${pages.subtype}`}`
        ).then(async (response) => {
            let headers = {};
            const data = await response.json();

            for (let [key, value] of response.headers) {
                headers = {
                    ...headers,
                    [key]: value,
                };
            }

            const responseTotalPages = Math.ceil(
                +response.headers.get("total-count") / 10
            );

            if (pages.totalPages !== responseTotalPages) {
                getTotalPage(responseTotalPages);
            }

            setPokemons([...data.cards]);

            setLoading((prev) => {
                return {
                    ...prev,
                    cards: false,
                };
            });
            setLoading((prev) => {
                return {
                    ...prev,
                    pagination: false,
                };
            });
        });
    }, [pages.types, pages.subtype, pages.page]);

    const asidePositionHandler = () => {
        if (document.documentElement.clientWidth > 820) {
            if (window.pageYOffset + 10 > asideOffsetTopRef.current) {
                setFixedBar(true);
            } else {
                setFixedBar(false);
            }
        }
    };

    const subsidiaryFilterFuncs = () => {
        scrollTop();
        setLoading((prev) => {
            return {
                ...prev,
                pagination: true,
            };
        });
        setCurrentPageToStart();
    };

    const typeHandler = (value) => {
        subsidiaryFilterFuncs();
        setTypes(value);
    };

    const subtypeHandler = (value) => {
        subsidiaryFilterFuncs();
        setSubtype(value);
    };

    const removeFiltersHandler = () => {
        scrollTop();
        removeFilters();

        history.push("/");
    };

    const quickViewHandler = (index) => {
        setPokemon(pokemon ? null : pokemons[index]);
        document.body.style.overflow = pokemon ? "" : "hidden";
    };

    return (
        <div
            className={classNames(
                classes.Home,
                "container",
                fixedBar ? classes.FixedBar : null
            )}
        >
            <aside ref={homeRef} className={classNames(classes.Aside)}>
                <SortPopup
                    label="Type"
                    list={typeArr}
                    onClickSortPopup={typeHandler}
                    activeSortPopupItem={pages.types}
                    resetFilter={setTypes}
                    selectedFilter={pages.types}
                    loading={loading.types}
                />
                <SortPopup
                    label="Subtype"
                    list={subtypeArr}
                    onClickSortPopup={subtypeHandler}
                    activeSortPopupItem={pages.subtype}
                    resetFilter={setSubtype}
                    selectedFilter={pages.subtype}
                    loading={loading.subtypes}
                />
                <button onClick={removeFiltersHandler} disabled={!pages.canUse}>
                    Reset all filters
                </button>
            </aside>
            <main>
                <ul className={classes.PokemonList}>
                    {loading.cards
                        ? Array(10)
                              .fill(1)
                              .map((_, index) => (
                                  <PokemonCard key={index} loading={loading.cards} />
                              ))
                        : pokemons.map(
                              ({ imageUrl, name, artist, id, types, subtype }, index) => (
                                  <PokemonCard
                                      key={`${name}_${id}`}
                                      imageUrl={imageUrl}
                                      name={name}
                                      artist={artist}
                                      id={id}
                                      types={types}
                                      subtype={subtype}
                                      loading={loading.cards}
                                      index={index}
                                      onClick={quickViewHandler}
                                  />
                              )
                          )}
                </ul>
                {!loading.pagination && pages.totalPages > 1 && (
                    <Pagination pages={pages} pressPage={pressPage} />
                )}
            </main>
            {pokemon && <QuickView pokemon={pokemon} closeQuickView={quickViewHandler} />}
        </div>
    );
};

export default Home;
