import React from "react";
import classes from "./Home.module.scss";
import classNames from "classnames";
import { useAuth } from "../../hooks/auth.hook";
import Axios from "axios";
import { PokemonCard } from "../../components";

const Home = () => {
    const [pokemons, setPokemons] = React.useState([]);
    const [count, setCount] = React.useState(1);

    React.useEffect(async () => {
        Axios.get(`https://api.pokemontcg.io/v1/cards?artist=Ryo_Ueda&page=${count}&pageSize=10`).then((res) => {
            console.log(res);
            setPokemons([...res.data.cards]);
        });
        
        const response = await fetch("https://api.pokemontcg.io/v1/cards?artist=Ryo_Ueda&page=${count}&pageSize=10", {
            headers: {
                'Content-Type': 'text/plain',
                'Content-Length': 'text/plain',
                'X-Custom-Header': 'ProcessThisImmediately'
              }
        });

        console.log(response);
        const data = await response.json();

        console.log(data);
    }, [count]);

    return (
        <div className={classNames(classes.Home, "container")}>
            <aside onClick={() => {setCount(count + 1)}}></aside>
            <ul className={classes.PokemonList}>
                {pokemons.map(({ imageUrl, name, artist, id }) => (
                    <PokemonCard
                        key={`${name}_${id}`}
                        imageUrl={imageUrl}
                        name={name}
                        artist={artist}
                        id={id}
                    />
                ))}
            </ul>
        </div>
    );
};

export default Home;
