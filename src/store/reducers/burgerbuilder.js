import * as actionType from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    meat: 1.0,
    bacon: 1.2,
    cheese: 0.7
}

const burgerbuilder = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }

        case actionType.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]

            }
        case actionType.SET_INGREDIENTS:
            return {
                ...state,
                // not state.ingredients
                ingredients: {
                    meat: action.ingredients.meat,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    salad: action.ingredients.salad
                },
                error: false,
                // Reset the price after place the order
                totalPrice: 4
            }
        case actionType.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }

        default:
            return state;
    }
}

export default burgerbuilder;