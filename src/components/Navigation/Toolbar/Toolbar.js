import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawToggle from '../SideDrawer/DrawToggle/DrawToggle';
import { NavLink } from 'react-router-dom';

/**
* @author
* @function Toolbar
**/

const Toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <DrawToggle clicked={props.drawToggleCliked} />
            <NavLink to="/" className={classes.Logo}>
                <Logo />
            </NavLink>
            <nav className={classes.Desktop}>
                <NavigationItems isAuthenticated={props.isAuth} />
            </nav>
        </header>
    )

}

export default Toolbar