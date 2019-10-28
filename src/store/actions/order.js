import * as actionTypes from './actionTypes';

export function purchaseBurgerSuccess(id, orderData) {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export function purchaseBurgerFail(error) {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export function loading() {
    return {
        type: actionTypes.LOADING
    }
}

export function resetPrice() {
    return {
        type: actionTypes.RESET_PRICE
    }
}

export const purchaseBurger = (order, history, token) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SAGA,
        order,
        history,
        token
    }
}

export function ordersFailure(error) {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export function orderSuccess(orders) {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const getOrders = (token, userId) => {
    return {
        type: actionTypes.GET_ORDERS_SAGA,
        token,
        userId
    }
}