import React, { Component } from 'react'
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import { connect } from 'react-redux';
import * as actionType from '../../store/action';

/**
* @author
* @class BurgerBuilder
**/

class BurgerBuilder extends Component {
    state = {
        // purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        // axios.get("/ingredients.json")
        //     .then(response => {
        //         this.setState({ ingredients: response.data });
        //     }).catch(error => { this.setState({ error: true }) })
    }

    // Have to use =()=>{}; otherwise you will get an error
    purchasingHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContineHandler = () => {
        this.props.history.push('/checkout');
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }


    render() {
        const disabledInfo = { ...this.props.ings };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>The ingredients cannot be loaded</p> : <Spinner />;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        addedIngredient={this.props.addIngredients}
                        removedIngredient={this.props.removeIngredients}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchasingHandler}
                    />
                </Aux>)
            orderSummary = <OrderSummary ingredients={this.props.ings}
                cancelOrder={this.purchaseCancelHandler}
                continueOrder={this.purchaseContineHandler}
                totalPrice={this.props.price} />
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredients: (igName) => dispatch({
            type: actionType.ADD_INGREDIENT,
            ingredientName: igName
        }),
        removeIngredients: (igName) => dispatch({
            type: actionType.REMOVE_INGREDIENT,
            ingredientName: igName
        })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));