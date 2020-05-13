import React, { useState } from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';


const Layout = props => {

    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerclosedHandler = () => {
        setShowSideDrawer(false);
    }

    const drawToggleHandler = () => {
        this.setState(() => {
            setShowSideDrawer(!showSideDrawer);
        })
    }

        return (
            <Aux>
                <Toolbar isAuth={props.isAuthenticated}
                    drawToggleCliked={drawToggleHandler} />
                <SideDrawer isAuth={props.isAuthenticated}
                    open={showSideDrawer}
                    closed={sideDrawerclosedHandler} />
                <main className={classes.Content}>{props.children}</main>
            </Aux>
        )

}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);