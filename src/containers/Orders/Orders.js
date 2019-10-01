import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';

class Orders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            loading: true
        }
    }


    componentDidMount() {
        axios.get('order.json')
            .then(resp => {
                const fetchedOrders = [];
                for (let key in resp.data) {
                    fetchedOrders.push({
                        ...resp.data[key],
                        id: key
                    });
                }
                this.setState({ orders: fetchedOrders, loading: false });
            })
            .catch(err => {
                this.setState({ loading: false });
            })
    }

    render() {

        let orders = (<Spinner />);
        if (this.state.orders.length) {
            orders = (
                this.state.orders.map(ord => {
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

export default withErrorHandler(Orders, axios);