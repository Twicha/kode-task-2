import React from 'react';
import classes from './SinglePokemon.module.scss';
import classNames from 'classnames';
import Axios from 'axios';

const SinglePokemon = ({match}) => {

    const [pokemon, setPokemon] = React.useState({});

    console.log(match);

    React.useEffect(() => {
        Axios.get(`https://api.pokemontcg.io/v1/cards/${match.params.id}`).then((res) => {
            console.log(res);
            setPokemon({...res.data.card});
        });
    }, []);

    return (
        <div>
            <img src={pokemon.imageUrl} alt="gdfgfd"/>
            {pokemon.name}
        </div>
    )
}

export default SinglePokemon;
