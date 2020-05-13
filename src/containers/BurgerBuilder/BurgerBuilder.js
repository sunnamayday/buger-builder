import React, { useState, useEffect, useCallback } from 'react'
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import { useDispatch, useSelector } from 'react-redux';
import * as actionCreators from '../../store/actions/index';


const BurgerBuilder = props => {

    const [purchasing, setPurchasing] = useState(false);

    const ings = useSelector(state => state.burgerbuilder.ingredients);
    const price = useSelector(state => state.burgerbuilder.totalPrice);
    const error = useSelector(state => state.order.error);
    // const purchased = useSelector(state => state.order.purchased);
    const isAuthenticated = useSelector(state => state.auth.token !== null);
    // const authenticatedPath = useSelector(state => state.auth.path);


    const dispatch = useDispatch();
    const addIngredients = igName => dispatch(actionCreators.addIngredient(igName));
    const removeIngredients = igName => dispatch(actionCreators.removeIngredient(igName));
    const onIniteIngredients = useCallback(() => dispatch(actionCreators.initeIngredient()), [dispatch]);
    const onInitPurchase = () => dispatch(actionCreators.initPurchase());
    const onSetRedirectPath = (path) => dispatch(actionCreators.authRedirectPath(path));


    useEffect(() => {
        console.log('[burgerbuilder.js]')
        onIniteIngredients();
    }, [onIniteIngredients]);

    // Have to use =()=>{}; otherwise you will get an error
    const purchasingHandler = () => {
        if (isAuthenticated) {
            setPurchasing(true);
            console.log(purchasing)

        } else {
            // after the user login, the page path is set to /checkout page
            onSetRedirectPath('/checkout');
            props.history.push('/auth');
        }

    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContineHandler = () => {
        onInitPurchase();
        props.history.push('/checkout');
    }

    const updatePurchaseState = ingredients => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }


    const disabledInfo = { ...ings };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = error ? <p>The ingredients cannot be loaded</p> : <Spinner />;

    if (ings) {
        burger = (
            <Aux>
                <Burger ingredients={ings} />
                <BuildControls
                    addedIngredient={addIngredients}
                    removedIngredient={removeIngredients}
                    disabled={disabledInfo}
                    price={price}
                    purchasable={updatePurchaseState(ings)}
                    ordered={purchasingHandler}
                    isAuth={isAuthenticated}
                />
            </Aux>)
        orderSummary = <OrderSummary ingredients={ings}
            cancelOrder={purchaseCancelHandler}
            continueOrder={purchaseContineHandler}
            totalPrice={price} />
    }
    return (
        <Aux>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    )

}



export default withErrorHandler(BurgerBuilder, axios);