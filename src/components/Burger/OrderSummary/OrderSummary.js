import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

/**
* @author
* @function OrderSummary
**/

const OrderSummary = props => {

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
                <p><strong>Total Price: {props.totalPrice.toFixed(2)}</strong></p>
                <p>Continue to check out?</p>
                <Button btnType="Danger" clicked={props.cancelOrder}>Cancel</Button>
                <Button btnType="Success" clicked={props.continueOrder}>Continue</Button>
            </Aux>
        )
    

}

export default OrderSummary