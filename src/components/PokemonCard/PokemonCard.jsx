import React from "react";
import classes from "./PokemonCard.module.scss";
import pokemonNotFound from "./pokemon-not-found.jpg";
import { Link } from "react-router-dom";

const PokemonCard = ({
    imageUrl = pokemonNotFound,
    name = "Pokemon name",
    artist = "artist",
    id,
}) => {
    return (
        <li className={classes.PokemonCard}>
            <Link to={`/pokemon/${id}`}>
                <div
                    className={classes.PokemonCard__Img}
                    style={{ backgroundImage: `url(${imageUrl})` }}
                ></div>
                <h2 className={classes.PokemonCard__Title}>{name}</h2>
                <p className={classes.PokemonCard__Disc}>{artist}</p>
            </Link>
        </li>
    );
};

export default PokemonCard;
