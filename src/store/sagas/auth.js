import { put, delay } from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from 'axios';

export function* logout_SAGA(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expireDate');
    yield localStorage.removeItem('userId');
    yield put(actions.logoutSucceed());
}

export function* authLogout_SAGA(action) {
    yield delay(action.expiresIn);
    yield put(actions.logout());
}

export function* login_SAGA(action) {
    yield put(actions.authStart());
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB5j8cFJHCdD414uNcTJNuvfTXPHhGoAJs';
    if (action.isSignUp) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB5j8cFJHCdD414uNcTJNuvfTXPHhGoAJs';
    }
    try {
        const resp = yield axios.post(url, { email: action.email, password: action.password, returnSecureToken: true })
        const expireDate = yield new Date().getTime() + resp.data.expiresIn * 1000;
        yield localStorage.setItem('token', resp.data.idToken);
        yield localStorage.setItem('expireDate', expireDate);
        yield localStorage.setItem('userId', resp.data.localId);
        yield put(actions.authSuccess(resp.data.idToken, resp.data.localId));
        yield put(actions.auth_logout(resp.data.expiresIn));
    } catch (err) {
        yield put(actions.authFail(err.response.data.error));
    }
}

export function* authCheckState_SAGA(action) {
    const token = yield localStorage.getItem('token');
    if (!token) {
        yield put(actions.logout());
    } else {
        const expireDate = yield localStorage.getItem('expireDate');
        if (new Date().getTime() > expireDate) {
            yield put(actions.logout());
        } else {
            const userId = yield localStorage.getItem('userId');
            yield put(actions.authSuccess(token, userId));
            const expiresAfter = Math.round((expireDate - new Date().getTime()) / 1000);
            yield put(actions.auth_logout(expiresAfter));
        }
    }
}
