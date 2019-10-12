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

const logout = () => {
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
                dispatch(authSuccess(resp.data.idToken, resp.data.localId));
                dispatch(auth_logout(resp.data.expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            })
    }
}