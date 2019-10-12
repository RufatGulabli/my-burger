import * as actions from '../actions/actionTypes';

const initialState = {
    idToken: '',
    loading: false
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actions.LOGIN_START: {
            return {
                ...state,
                loading: true
            }
        }
        case actions.LOGIN_SUCCESS: {
            return {
                ...state,
                loading: false
            }
        }
        case actions.LOGIN_FAIL: {
            return {
                ...state,
                loading: false
            }
        }
    }

    return state;
}

export default reducer;