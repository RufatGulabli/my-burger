import * as actionTypes from './actionTypes';

export function authStart() {
    return {
        type: actionTypes.LOGIN_START
    }
}

export function authSuccess(idToken, userId) {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        idToken: idToken,
        userId: userId
    }
}

export function authFail(err) {
    return {
        type: actionTypes.LOGIN_FAIL,
        error: err
    }
}

export const logout = () => { return { type: actionTypes.AUTH_INITIATE_LOGOUT_SAGA } };

export const logoutSucceed = () => { return { type: actionTypes.LOGOUT } };

export const auth_logout = (expiresIn) => {
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT_SAGA,
        expiresIn: expiresIn * 1000
    }
}

export const login = (email, password, isSignUp) => {
    return {
        type: actionTypes.LOGIN_SAGA,
        email,
        password,
        isSignUp
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT,
        path: path
    }
}

export const getUserDetailsFromLocalStorage = () => {
    return {
        type: actionTypes.AUTH_CHECK_STATE_SAGA
    }
}