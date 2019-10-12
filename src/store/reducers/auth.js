import * as actions from '../actions/actionTypes';

const initialState = {
    idToken: null,
    userId: null,
    error: null,
    loading: false
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
    }

    return state;
}

export default reducer;