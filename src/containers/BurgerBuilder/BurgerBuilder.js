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
import * as actionCreators from '../../store/actions/index';

/**
* @author
* @class BurgerBuilder
**/

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }

    componentDidMount() {
        this.props.onIniteIngredients();
    }

    // Have to use =()=>{}; otherwise you will get an error
    purchasingHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true })
        } else {
            // after the user login, the page path is set to /checkout page
            this.props.onSetRedirectPath('/checkout');
            this.props.history.push('/auth');
        }

    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContineHandler = () => {
        this.props.onInitPurchase();
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
        let burger = this.props.error ? <p>The ingredients cannot be loaded</p> : <Spinner />;

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
                        isAuth={this.props.isAuthenticated}
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
        ings: state.burgerbuilder.ingredients,
        price: state.burgerbuilder.totalPrice,
        error: state.order.error,
        purchased: state.order.purchased,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredients: (igName) => dispatch(actionCreators.addIngredient(igName)),
        removeIngredients: (igName) => dispatch(actionCreators.removeIngredient(igName)),
        onIniteIngredients: () => dispatch(actionCreators.initeIngredient()),
        onInitPurchase: () => dispatch(actionCreators.initPurchase()),
        onSetRedirectPath: (path)=> dispatch(actionCreators.authRedirectPath(path))

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));