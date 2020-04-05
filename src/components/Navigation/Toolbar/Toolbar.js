import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawToggle from '../SideDrawer/DrawToggle/DrawToggle';

/**
* @author
* @function Toolbar
**/

const Toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <DrawToggle clicked={props.drawToggleCliked} />
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav className={classes.Desktop}>
                <NavigationItems />
            </nav>
        </header>
    )

}

export default Toolbar