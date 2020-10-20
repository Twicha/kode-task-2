import React, { useContext } from 'react';
import classes from './Header.module.scss';
import classNames from 'classnames';
import { AuthContext } from '../../context/AuthContext';
import { Link, Route } from 'react-router-dom';

const Header = () => {
    const {logout} = useContext(AuthContext);

    return (
        <div className={classNames(classes.Header, "container")}>
            <Route path="/:id">
                <Link to="/">&lt; Back</Link>
            </Route>
            <button type="button" onClick={logout}>Logout</button>
        </div>
    )
}

export default Header;
