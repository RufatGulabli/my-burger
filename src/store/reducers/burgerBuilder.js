import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 2.5,
    error: false,
    building: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: {
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName],
                building: true
            }
        }
        case actionTypes.REMOVE_INGREDIENT: {
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName],
                building: true
            }
        }
        case actionTypes.INIT_INGREDIENTS: {
            return {
                ...state,
                ingredients: action.ingredients,
                error: false,
                totalPrice: 2.5,
                building: false
            }
        }
        case actionTypes.FETCH_INGREDIENTS_FAILED: {
            return {
                ...state,
                error: true
            }
        }
        case actionTypes.RESET_PRICE: {
            return {
                ...state,
                totalPrice: 2.5
            }
        }
        default: { }
    }

    return state;
}

const INGREDIENTS_PRICE = {
    salad: 0.5,
    bacon: 1.8,
    cheese: 1.0,
    meat: 2.5
}

export default reducer;