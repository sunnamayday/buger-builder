import React from 'react';
import classes from './Button.module.css';

/**
* @author
* @function Button
**/

const Button = (props) => {
    return (
        <div className={[classes.Button, classes[props.btnType]].join(' ')}
            onClick={props.clicked}>{props.children}</div>
    )

}

export default Button