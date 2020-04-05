import React from 'react';
import classes from './DrawToggle.module.css';

/**
* @author
* @function DrawToggle
**/

const DrawToggle = (props) => {
    return (
        <div onClick={props.clicked} className={classes.DrawToggle}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )

}

export default DrawToggle