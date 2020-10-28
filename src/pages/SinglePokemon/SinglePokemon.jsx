import React from "react";
import classes from "./SinglePokemon.module.scss";
import classNames from "classnames";
import { useHttp } from "../../hooks/http.hook";
import { Loader } from "../../components";

const defaultInfo = "Unfortunately this information is not available";

const SinglePokemon = ({ match }) => {
    const { request } = useHttp();
    const [pokemon, setPokemon] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        setLoading(true);
        request(`/cards/${match.params.id}`).then(async (response) => {
            const data = await response.json();

            setPokemon({ ...data.card });
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className={classNames(classes.SinglePokemon, "container")}>
                <Loader />;
            </div>
        );
    }

    return (
        <React.Fragment>
            {pokemon && (
                <div className={classNames(classes.SinglePokemon, "container")}>
                    <div className={classes.SinglePokemonInfo}>
                        <div className={classes.SinglePokemon__Img}>
                            <img
                                src={pokemon.imageUrl && pokemon.imageUrl}
                                alt={pokemon.name && pokemon.name}
                            />
                        </div>
                        <ul>
                            <li>
                                <span>Pokemon name: </span>
                                <span>{pokemon.name ? pokemon.name : defaultInfo}</span>
                            </li>
                            <li>
                                <span>Type: </span>
                                <span>
                                    {pokemon.types
                                        ? pokemon.types.join(", ")
                                        : defaultInfo}
                                </span>
                            </li>
                            <li>
                                <span>Subtype: </span>
                                <span>
                                    {pokemon.subtype ? pokemon.subtype : defaultInfo}
                                </span>
                            </li>
                            <hr />
                            <li>
                                <span>Attack Damage: </span>
                                <span>
                                    {pokemon.attacks
                                        ? pokemon.attacks
                                              .map((item) => item.damage)
                                              .join(", ")
                                        : defaultInfo}
                                </span>
                            </li>
                            <li>
                                <span>Attack Cost: </span>
                                <span>
                                    {pokemon.attacks
                                        ? pokemon.attacks
                                              .map((item) => item.cost.join("+"))
                                              .join(", ")
                                        : defaultInfo}
                                </span>
                            </li>
                            <li>
                                <span>Resistances: </span>
                                <span>
                                    {pokemon.resistances
                                        ? pokemon.resistances
                                              .map((item) => `${item.type} ${item.value}`)
                                              .join(", ")
                                        : defaultInfo}
                                </span>
                            </li>
                            <li>
                                <span>Evolves From: </span>
                                <span>
                                    {pokemon.evolvesFrom
                                        ? pokemon.evolvesFrom
                                        : defaultInfo}
                                </span>
                            </li>
                        </ul>
                    </div>
                    <p className={classes.SinglePokemon__Desc}>
                        {pokemon.attacks
                            ? pokemon.attacks.map((item) => item.text).join(" ")
                            : defaultInfo}
                    </p>
                </div>
            )}
        </React.Fragment>
    );
};

export default SinglePokemon;
