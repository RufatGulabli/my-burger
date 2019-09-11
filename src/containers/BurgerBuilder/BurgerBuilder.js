import React, { Component, Fragment } from 'react';
import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from './../../components/UI/Spinner/Spinner';
import WithErrorhandler from '../../HOC/withErrorHandler/withErrorHandler';

const INGREDIENTS_PRICE = {
    salad: 0.5,
    bacon: 1.8,
    cheese: 1.0,
    meat: 2.5
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 2.5,
        purchasable: false,
        purchasing: false,
        loading: false,
        isNetworkError: false
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(resp => this.setState({ ingredients: resp.data }))
            .catch(error => this.setState({ isNetworkError: true }));
    }

    updatePurchaseState(ingredients) {
        const arr = Object.values(ingredients);
        const total = arr.reduce((acc, curr) => {
            return acc + curr;
        }, 0);
        this.setState({
            purchasable: total > 0
        });
    }

    purchasing = () => {
        this.setState({ purchasing: true });
    }

    modalClosed = () => {
        this.setState({ purchasing: false });
    }

    addIngredientHandler = (type) => {
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] += 1;
        let updatedPrice = this.state.totalPrice;
        updatedPrice += INGREDIENTS_PRICE[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const updatedIngredients = { ...this.state.ingredients };
        if (updatedIngredients[type] === 0) {
            return;
        }
        updatedIngredients[type] -= 1;
        let updatedPrice = this.state.totalPrice;
        updatedPrice -= INGREDIENTS_PRICE[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        });
        this.updatePurchaseState(updatedIngredients);
    }

    continueOrder = () => {
        // this.setState({ loading: true });
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Rufat Gulabli',
        //         address: {
        //             street: 'O.Karimov str 16/19 m3',
        //             zipCode: 'AZ1016',
        //             city: 'Baku',
        //             country: 'Azerbaijan'
        //         },
        //         email: 'gulabli.rufat@gmail.com',
        //         deliveryMethod: 'fastest'
        //     }
        // }
        // axios.post('/order.json', order)
        //     .then(resp => {
        //         this.setState({ loading: false, purchasing: false })
        //     })
        //     .catch(error => this.setState({ loading: false, purchasing: false }));
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = { ...this.state.ingredients };
        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.isNetworkError
            ? <p style={{ textAlign: 'center' }}>Ingredients can't be fetched. Please check your network connection.</p>
            : <Spinner />

        if (this.state.ingredients) {
            burger = (
                <Fragment>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        add={this.addIngredientHandler}
                        remove={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchasing}
                    />
                </Fragment>
            );
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                ordered={this.purchasing}
                cancelled={this.modalClosed}
                continued={this.continueOrder}
                price={this.state.totalPrice}
            />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.modalClosed}>
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        );
    }
}

export default WithErrorhandler(BurgerBuilder, axios);