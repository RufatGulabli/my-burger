import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';
import * as actions from '../actions/index';

export function* purchaseBurger_SAGA(action) {
    try {
        console.log('purchaseBurger_SAGA')
        yield put(actions.loading());
        const resp = yield axios.post(`/orders.json?auth=${action.token}`, action.order);
        yield put(actions.purchaseBurgerSuccess(resp.data.name, action.order));
        action.history.replace('/');
        yield put(actions.resetPrice());
    } catch (error) {
        yield put(actions.purchaseBurgerFail(error));
    }
}

export function* getOrders_SAGA(action) {
    try {
        yield put(actions.loading());
        const queryParams = `?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`;
        const resp = yield axios.get(`orders.json${queryParams}`);
        const fetchedOrders = [];
        for (let key in resp.data) {
            fetchedOrders.push({
                ...resp.data[key],
                id: key
            });
        }
        yield put(actions.orderSuccess(fetchedOrders));
    } catch (err) {
        yield put(actions.ordersFailure(err));
    }
}