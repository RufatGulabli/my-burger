import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = ingName => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName
    }
}

export const removeIngredient = ingName => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then(resp => {
                dispatch(setIngredients(resp.data));
            })
            .catch(() => {
                dispatch(setError());
            });
    }
}

function setIngredients(ings) {
    return {
        type: actionTypes.INIT_INGREDIENTS,
        ingredients: ings
    }
}

function setError() {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}
