import * as actions from '../actions/actionTypes';

const initialState = {
    idToken: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actions.LOGIN_START: {
            return {
                ...state,
                loading: true,
                error: null
            }
        }
        case actions.LOGIN_SUCCESS: {
            return {
                ...state,
                idToken: action.idToken,
                userId: action.userId,
                error: null,
                loading: false
            }
        }
        case actions.LOGIN_FAIL: {
            return {
                ...state,
                error: action.error,
                loading: false
            }
        }
        case actions.LOGOUT: {
            return {
                ...state,
                idToken: null,
                userId: null
            }
        }
        case actions.SET_AUTH_REDIRECT: {
            return {
                ...state,
                authRedirectPath: action.path
            }
        }
        default: {
            return state;
        }
    }
}

export default reducer;