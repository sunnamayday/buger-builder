import React, { Component } from 'react'
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';

/**
* @author
* @class BurgerBuilder
**/

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.7,
    meat: 1.0,
    bacon: 1.2
}
class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 0,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get("/ingredients.json")
            .then(response => {
                this.setState({ ingredients: response.data });
            }).catch(error => { this.setState({ error: true }) })
    }

    // Have to use =()=>{}; otherwise you will get an error
    purchasingHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContineHandler = () => {
        // alert('You continue!')
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: "Max",
                address: {
                    street: "test street",
                    zipCode: "v8n123",
                    country: "Canada"
                },
                email: "test@gmail.com"
            },
            deliveryMethod: "fastest"
        }
        axios.post('/order.json', order)
            .then(response => {
                // purchasing: false to close the modal
                this.setState({ loading: false, purchasing: false })
            }).catch(error => {
                console.log(error);
                this.setState({ loading: false, purchasing: false })

            });
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice + INGREDIENT_PRICES[type];
        this.setState({ totalPrice: updatedPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice - INGREDIENT_PRICES[type];
        this.setState({ totalPrice: updatedPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    }

    render() {
        const disabledInfo = { ...this.state.ingredients };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>The ingredients cannot be loaded</p> : <Spinner />;

        if (this.state.ingredients) {
            burger = <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    addedIngredient={this.addIngredientHandler}
                    removedIngredient={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchasingHandler}
                />
            </Aux>
            orderSummary = <OrderSummary ingredients={this.state.ingredients}
                cancelOrder={this.purchaseCancelHandler}
                continueOrder={this.purchaseContineHandler}
                totalPrice={this.state.totalPrice} />
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}


BurgerBuilder.propTypes = {}
export default withErrorHandler(BurgerBuilder, axios);