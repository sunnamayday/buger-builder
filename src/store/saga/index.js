import { takeEvery, all, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './auth';
import { initeIngredientSaga } from './burgerbuilder';
import { purchaseBurgerSaga, fetchOrderSaga } from './order';


export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_INITLOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
    ])
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INITE_INGREDIENTS, initeIngredientSaga);
}

export function* watchOrder() {
    yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
    // yield takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
    yield takeEvery(actionTypes.FETCH_ORDER, fetchOrderSaga);
}