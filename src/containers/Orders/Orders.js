import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import { getOrders } from '../../store/actions/index';

class Orders extends Component {

    componentDidMount() {
        this.props.getOrders();
    }

    render() {
        let orders = (<Spinner />);
        if (this.props.orders.length) {
            orders = (
                this.props.orders.map(ord => {
                    return (<Order key={ord.id} price={Number.parseFloat(ord.price).toFixed(2)} ingredients={ord.ingredients} />);
                })
            );
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getOrders: () => dispatch(getOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));