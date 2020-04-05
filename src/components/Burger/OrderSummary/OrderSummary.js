import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';
import { Component } from 'react';

/**
* @author
* @function OrderSummary
**/

class OrderSummary extends Component {

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return <li key={igKey}><span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}</li>
            });
        return (
            <Aux>
                <h3>Your Order:</h3>
                <p>A delicious burger with following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.totalPrice.toFixed(2)}</strong></p>
                <p>Continue to check out?</p>
                <Button btnType="Danger" clicked={this.props.cancelOrder}>Cancel</Button>
                <Button btnType="Success" clicked={this.props.continueOrder}>Continue</Button>
            </Aux>
        )
    }

}

export default OrderSummary