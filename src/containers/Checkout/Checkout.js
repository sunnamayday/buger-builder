import React, { Component } from 'react';
import CheckoutSummary from '../../components/Burger/OrderSummary/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
/**
* @author
* @class Checkout 
**/

class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0
    }

    componentWillMount() {
        const queryParms = new URLSearchParams(this.props.history.location.search)
        const ingredients = {};
        let price = 0;
        for (let param of queryParms.entries()) {
            // using + to change string to int
            if (param[0] == "price") {
                price = +param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ ingredients: ingredients, price: price });
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace(this.props.match.url + '/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route path={this.props.match.url + '/contact-data'}
                    render={
                        (props) => (
                            <ContactData ingredients={this.state.ingredients}
                                price={this.state.price}
                                {...props}
                            />)
                    } />
            </div>
        )
    }
}


export default Checkout;