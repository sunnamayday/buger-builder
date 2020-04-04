import React from 'react';
import Aux from '../../../hoc/Aux';

/**
* @author
* @function OrderSummary
**/

const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return <li key={igKey}><span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}</li>
        });

    return (
        <Aux>
            <h3>Your Order:</h3>
            <p>A delicious burger with following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to check out?</p>
        </Aux>
    )

}

export default OrderSummary