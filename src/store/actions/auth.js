import * as actionTypes from './actionTypes';
import axios from 'axios';

export const auth_start = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const auth_success = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
}

export const auth_fail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiredDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

const auth_check_auth_timeout = (expireTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expireTime * 1000)
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(auth_start());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        const API_KEY = 'AIzaSyC-bH-N4XYsCGFePt1eAoaM4HcfA13F8_w';
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_KEY;
        if (isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + API_KEY;
        }
        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(auth_success(response.data.idToken, response.data.localId));
                dispatch(auth_check_auth_timeout(response.data.expiresIn));

            })
            .catch(error => {
                dispatch(auth_fail(error.response.data.error));
            })

    }
}

export const authRedirectPath = (path) => {
    return {
        type: actionTypes.AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expiredDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(auth_success(token, userId));
                dispatch(auth_check_auth_timeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}