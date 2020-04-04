import React from 'react';
import classes from './BackDrop.module.css';

/**
* @author
* @function BackDrop
**/

const BackDrop = (props) => {
    return props.show ? <div className={classes.BackDrop} onClick={props.clicked}></div> : null;

}

export default BackDrop