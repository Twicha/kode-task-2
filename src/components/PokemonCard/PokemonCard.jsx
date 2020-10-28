import React from "react";
import classNames from "classnames";
import classes from "./PokemonCard.module.scss";
import pokemonNotFound from "./pokemon-not-found.jpg";
import { Link } from "react-router-dom";
import littleMore from "./littleMore.svg";

const PokemonCard = ({
    imageUrl = pokemonNotFound,
    name = "Pokemon name",
    artist = "artist",
    id,
    loading,
    index,
    onClick,
}) => {
    const onClickHandler = () => {
        onClick(index);
    };

    if (loading) {
        return (
            <li className={classNames(classes.PokemonCard, loading && classes.Loading)}>
                <div className={classes.Wrapper}>
                    <div className={classes.PokemonCard__Img}></div>
                    <h2 className={classes.PokemonCard__Title}>{name}</h2>
                    <p className={classes.PokemonCard__Disc}>{artist}</p>
                </div>
            </li>
        );
    }

    return (
        <li className={classNames(classes.PokemonCard)}>
            <Link to={`/pokemon/${id}`}>
                <div
                    className={classes.PokemonCard__Img}
                    style={{ backgroundImage: `url(${imageUrl})` }}
                ></div>
                <h2 className={classes.PokemonCard__Title}>{name}</h2>
                <p className={classes.PokemonCard__Disc}>{artist}</p>
            </Link>
            <button
                className={classes.PokemonCard__LittleMore}
                style={{ backgroundImage: `url(${littleMore})` }}
                onClick={onClickHandler}
            ></button>
        </li>
    );
};

export default PokemonCard;
