import { put, delay, call } from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from 'axios';


export function* logoutSaga(action) {
    yield call([localStorage, 'removeItem'], "token");
    yield call([localStorage, 'removeItem'], "expiredDate");
    yield call([localStorage, 'removeItem'], "userId");

    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.authCheckTimeout());
}

export function* authUserSaga(action) {
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }
    const API_KEY = 'AIzaSyC-bH-N4XYsCGFePt1eAoaM4HcfA13F8_w';
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_KEY;
    if (action.isSignUp) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + API_KEY;
    }

    try {
        const response = yield axios.post(url, authData);
        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('userId', response.data.localId);
        yield put(actions.authSuccess(response.data.idToken, response.data.localId));
        yield put(actions.authCheckTimeout(response.data.expiresIn));
    } catch (error) {
        yield put(actions.authFail(error.response.data));
    }
}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem('token');
    if (!token) {
        yield put(actions.logout());
    } else {
        const expirationDate = yield  new Date(localStorage.getItem('expirationDate'));
        if (expirationDate <= new Date()) {
            yield put(actions.logout());
        } else {
            const userId = yield localStorage.getItem('userId');
            yield put(actions.authSuccess(token, userId));
            yield put(actions.authCheckTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
        }
    }
}