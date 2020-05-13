import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

/**
* @author
* @function BuildControls
**/

const controls = [
    { label: "Salad", type: "salad" },
    { label: "Cheese", type: "cheese" },
    { label: "Meat", type: "meat" },
    { label: "Bacon", type: "bacon" }
]

const BuildControls = props => {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {
                controls.map(ctrl => (
                    <BuildControl
                        key={ctrl.label}
                        label={ctrl.label}
                        added={() => props.addedIngredient(ctrl.type)}
                        removed={() => props.removedIngredient(ctrl.type)}
                        disabled={props.disabled[ctrl.type]}
                    />
                ))
            }
            <button
                className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.ordered}>{props.isAuth ? 'Order Now' : 'Sign up to order'}</button>
        </div>
    )

}

export default BuildControls