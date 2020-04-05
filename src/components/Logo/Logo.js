import React from 'react';
import LogoImg from '../../assets/images/logo.png';
import classes from './Logo.module.css'

/**
* @author
* @function Logo
**/

const Logo = (props) => {
    return (
        <div className={classes.Logo}><img src={LogoImg} alt=""/></div>
    )

}

export default Logo