import * as actions from './actionTypes';
import axios from 'axios';

function authStart() {
    return {
        type: actions.LOGIN_START
    }
}

function authSuccess(idToken, userId) {
    return {
        type: actions.LOGIN_SUCCESS,
        idToken: idToken,
        userId: userId
    }
}

function authFail(err) {
    return {
        type: actions.LOGIN_FAIL,
        error: err
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expireDate');
    localStorage.removeItem('userId');
    return {
        type: actions.LOGOUT
    }
}

const auth_logout = (expiresIn) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expiresIn * 1000);
    }
}

export const login = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB5j8cFJHCdD414uNcTJNuvfTXPHhGoAJs';
        if (isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB5j8cFJHCdD414uNcTJNuvfTXPHhGoAJs';
        }
        axios.post(url, { email, password, returnSecureToken: true })
            .then(resp => {
                const expireDate = new Date().getTime() + resp.data.expiresIn * 1000;
                localStorage.setItem('token', resp.data.idToken);
                localStorage.setItem('expireDate', expireDate);
                localStorage.setItem('userId', resp.data.localId);
                dispatch(authSuccess(resp.data.idToken, resp.data.localId));
                dispatch(auth_logout(resp.data.expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actions.SET_AUTH_REDIRECT,
        path: path
    }
}

export const getUserDetailsFromLocalStorage = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expireDate = localStorage.getItem('expireDate');
            if (new Date().getTime() > expireDate) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                const expiresAfter = Math.round((expireDate - new Date().getTime()) / 1000);
                dispatch(auth_logout(expiresAfter));
            }
        }
    }
}