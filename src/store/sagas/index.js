import { takeEvery } from 'redux-saga/effects';
import { logout_SAGA, authLogout_SAGA, login_SAGA, authCheckState_SAGA } from './auth';
import { initIngredients_SAGA } from './burgerBuilder';
import { purchaseBurger_SAGA, getOrders_SAGA } from './order';
import * as actions from '../actions/actionTypes';

export function* watchAuth() {
    yield takeEvery(actions.AUTH_INITIATE_LOGOUT_SAGA, logout_SAGA);
    yield takeEvery(actions.AUTH_CHECK_TIMEOUT_SAGA, authLogout_SAGA);
    yield takeEvery(actions.LOGIN_SAGA, login_SAGA);
    yield takeEvery(actions.AUTH_CHECK_STATE_SAGA, authCheckState_SAGA);
}

export function* watchBurger() {
    yield takeEvery(actions.BURGER_INIT_SAGA, initIngredients_SAGA);
}

export function* watchOrder() {
    yield takeEvery(actions.PURCHASE_BURGER_SAGA, purchaseBurger_SAGA);
    yield takeEvery(actions.GET_ORDERS_SAGA, getOrders_SAGA);
}

