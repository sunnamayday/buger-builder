import * as actionType from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    meat: 1.0,
    bacon: 1.2,
    cheese: 0.7
}

const addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    return updateObject(
        state,
        {
            ingredients: updatedIngredients,
            totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
            building: true
        });
}

const removeIngredient = (state, action) => {
    const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
    const updatedIngs = updateObject(state.ingredients, updatedIng);
    return updateObject(
        state,
        {
            ingredients: updatedIngs,
            totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
            building: true
        });
}

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: {
            meat: action.ingredients.meat,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            salad: action.ingredients.salad
        },
        error: false,
        // Reset the price after place the order
        totalPrice: 4
    });
}

const fetchIngredientsFAiled = (state, action) => {
    return updateObject(state, { error: true });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_INGREDIENT: return addIngredient(state, action);

        case actionType.REMOVE_INGREDIENT: return removeIngredient(state, action);

        case actionType.SET_INGREDIENTS: return setIngredients(state, action);

        case actionType.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFAiled(state, action);

        default: return state;
    }
}

export default reducer;