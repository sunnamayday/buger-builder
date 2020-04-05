import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

/**
* @author
* @function Layout
**/

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerclosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    drawToggleHandler = () => {
        this.setState((preState) => {
            return { showSideDrawer: !preState.showSideDrawer };
        })
    }

    render() {
        return (
            <Aux>
                <Toolbar drawToggleCliked={this.drawToggleHandler} />
                <SideDrawer open={this.state.showSideDrawer}
                    closed={this.sideDrawerclosedHandler} />
                <main className={classes.Content}>{this.props.children}</main>
            </Aux>
        )
    }

}

export default Layout