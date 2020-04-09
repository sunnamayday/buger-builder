import React from 'react';
import classes from './CheckoutSummary.module.css';
import Burger from '../../Burger';
import Button from '../../../UI/Button/Button';

/**
* @author
* @function CheckoutSummary
**/

const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1 style={{ textAlign: 'center' }}>We hope it tastes good!</h1>
            <div  >
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType="Danger" clicked={props.checkoutCancelled}>Cancel</Button>
            <Button btnType="Success" clicked={props.checkoutContinued}>Continue</Button>
        </div>
    )

}

export default CheckoutSummary;