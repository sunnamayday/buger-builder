import { put } from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from '../../axios-order';

export function* purchaseBurgerSaga(action) {
    yield put(actions.purchaseBurgerStart());
    try {
        const response = yield axios.post('/order.json?auth=' + action.token, action.orderData);
        // purchasing: false to close the modal
        yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData))

    } catch (error) {
        yield put(actions.purchaseBurgerFail(error));
    }
}

export function* fetchOrderSaga(action){
    const queryParam = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
    try{
        const res = yield axios.get('/order.json' + queryParam);
        const fetchedOrder = [];
        for (let key in res.data) {
            fetchedOrder.push({
                ...res.data[key],
                id: key
            })
        }
        yield put(actions.fetchOrderSuccess(fetchedOrder));

    } catch(error){
        yield put(actions.fetchOrderFail(error));
    }
}