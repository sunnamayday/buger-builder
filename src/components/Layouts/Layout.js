import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

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
                <Toolbar isAuth={this.props.isAuthenticated}
                    drawToggleCliked={this.drawToggleHandler} />
                <SideDrawer isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerclosedHandler} />
                <main className={classes.Content}>{this.props.children}</main>
            </Aux>
        )
    }

}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);