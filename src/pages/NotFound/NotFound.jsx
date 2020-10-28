import React from 'react';
import classes from './NotFound.module.scss';
import pikachu from './pikachu.gif';
import { Link } from 'react-router-dom';

const NotFound = () => {
    console.log('notfound');
    return (
        <div className={classes.NotFound} style={{backgroundImage: `url(${pikachu})`}}>
            <div className={classes.NotFound__Info}>
                <h1>404</h1>
                <p>Как Пикачу не старался, он не смог найти данную страницу...</p>
                <Link to="/">Перейти на главную</Link>
            </div>
        </div>
    )
}

export default NotFound;
