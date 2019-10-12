import * as actions from './actionTypes';
import axios from 'axios';

function authStart() {
    return {
        type: actions.LOGIN_START
    }
}

function authSuccess(token) {
    return {
        type: actions.LOGIN_SUCCESS,
        token: token
    }
}

function authFail(err) {
    return {
        type: actions.LOGIN_FAIL,
        error: err
    }
}

export const login = (email, password, isSignUp) => {
    console.log(isSignUp);
    return dispatch => {
        dispatch(authStart());
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB5j8cFJHCdD414uNcTJNuvfTXPHhGoAJs';
        if (isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB5j8cFJHCdD414uNcTJNuvfTXPHhGoAJs';
        }
        axios.post(url, { email, password, returnSecureToken: true })
            .then(resp => {
                dispatch(authSuccess(resp.data));
            })
            .catch(err => {
                dispatch(authFail(err));
            })
    }
}