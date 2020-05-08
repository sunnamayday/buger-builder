import * as actions from '../actions/index';
import axios from '../../axios-order';
import { put } from 'redux-saga/effects';

export function* initeIngredientSaga(action) {
    
    try {
        const response = yield axios.get("/ingredients.json");
        yield put(actions.setIngredients(response.data));
    } catch (error) {
        yield put(actions.fetchIngredientsFailed());
    }
}