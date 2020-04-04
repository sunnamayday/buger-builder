import React from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';

/**
* @author
* @function Layout
**/

const Layout = (props) => {
    return (
        <Aux>
            <div>Toolbar SideDrawer BackDrop</div>
            <main className={classes.Content}>{props.children}</main>
        </Aux>
    )

}

export default Layout