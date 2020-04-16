import * as actionTypes from '../actions/actionTypes';


const initialState = {
    order: [],
    loading: false,
    purchased: false
}
const order = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return{
                ...state,
                purchased: false,

            }
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const updatedOrder = {
                ...action.orderData,
                id: action.orderId,
            }
            return {
                ...state,
                order: state.order.concat(updatedOrder),
                loading: false,
                purchased: true

            }
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false
            }

        case actionTypes.FETCH_ORDER_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_ORDER_SUCCESS:
            return {
                ...state,
                order: action.orders,
                loading: false
            }
        case actionTypes.FETCH_ORDER_FAIL:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}

export default order;