import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData) => {
        return dispatch => {
            dispatch(purchaseBurgerStart());
            axios.post('/order.json', orderData)
            .then(response => {
                // purchasing: false to close the modal
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            }).catch(error => {
                console.log(error);
                dispatch(purchaseBurgerFail(error))
            });
    } 
}

export const initPurchase = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    }
}

export const fetchOrderFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDER_FAIL,
        error: error
    }
}

export const fetchOrder = (orders) => {
    return dispatch => {
        axios.get('/order.json').
            then(res => {
                const fetchedOrder = [];
                for (let key in res.data) {
                    fetchedOrder.push({
                        ...res.data[key],
                        id: key
                    })
                }
                dispatch(fetchOrderSuccess(fetchedOrder))
            }).catch(error => {
                dispatch(fetchOrderFail(error))
            })
    }
}