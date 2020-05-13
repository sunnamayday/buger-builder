import React, { Component } from 'react';
import CheckoutSummary from '../../components/Burger/OrderSummary/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';


const checkout = props => {

    const checkoutCancelledHandler = () => {
        props.history.goBack();
    }

    const checkoutContinuedHandler = () => {
        props.history.replace(props.match.url + '/contact-data');
    }

        let summary = <Redirect to='/' />
        if (props.ings) {
            const purchased = props.purchased ? <Redirect to='/' /> : null;
            summary = (
                <div>
                    {purchased}
                    <CheckoutSummary ingredients={props.ings}
                        checkoutCancelled={checkoutCancelledHandler}
                        checkoutContinued={checkoutContinuedHandler} />
                    <Route path={props.match.url + '/contact-data'}
                        component={ContactData} />
                </div>
            )
        }
        return summary;
}

const mapStateToProps = state => {
    return {
        ings: state.burgerbuilder.ingredients,
        purchased: state.order.purchased
    }
}


export default connect(mapStateToProps)(checkout);