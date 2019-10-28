import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';
import * as actions from '../actions/index';


export function* initIngredients_SAGA(action) {
    try {
        const resp = yield axios.get('/ingredients.json');
        yield put(actions.setIngredients(resp.data));
    } catch (error) {
        yield put(actions.setError());
    }
}