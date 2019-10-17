import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

function purchaseBurgerSuccess(id, orderData) {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}


function purchaseBurgerFail(error) {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

function loading() {
    return {
        type: actionTypes.LOADING
    }
}

function resetPrice() {
    return {
        type: actionTypes.RESET_PRICE
    }
}

export const purchaseBurger = (order, history, token) => {
    return dispatch => {
        dispatch(loading());
        axios.post(`/orders.json?auth=${token}`, order)
            .then(resp => {
                dispatch(purchaseBurgerSuccess(resp.data.name, order))
                history.replace('/');
                dispatch(resetPrice());
            })
            .catch(error => dispatch(purchaseBurgerFail(error)));

    }
}

function ordersFailure(error) {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

function orderSuccess(orders) {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const getOrders = (token, userId) => {
    return dispatch => {
        dispatch(loading());
        const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
        axios.get(`orders.json${queryParams}`)
            .then(resp => {
                const fetchedOrders = [];
                for (let key in resp.data) {
                    fetchedOrders.push({
                        ...resp.data[key],
                        id: key
                    });
                }
                dispatch(orderSuccess(fetchedOrders));
            })
            .catch(err => {
                dispatch(ordersFailure(err));
            })

    }
}