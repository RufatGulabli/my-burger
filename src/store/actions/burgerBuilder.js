import * as actionTypes from './actionTypes';

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

export const initIngredients = (ingredients) => {
    return {
        type: actionTypes.BURGER_INIT_SAGA,
        ingredients
    }
}

export function setIngredients(ings) {
    return {
        type: actionTypes.INIT_INGREDIENTS,
        ingredients: ings
    }
}

export function setError() {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}
