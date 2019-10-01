import React, { Component, Fragment } from 'react';
import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from './../../components/UI/Spinner/Spinner';
import WithErrorhandler from '../../HOC/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
        isNetworkError: false
    }

    componentDidMount() {
        // axios.get('/ingredients.json')
        //     .then(resp => this.setState({ ingredients: resp.data }))
        //     .catch(error => this.setState({ isNetworkError: true }));
    }

    updatePurchaseState() {
        const arr = Object.values(this.props.ingredients);
        const total = arr.reduce((acc, curr) => {
            return acc + curr;
        }, 0);
        return total > 0;
    }

    purchasing = () => {
        this.setState({ purchasing: true });
    }

    modalClosed = () => {
        this.setState({ purchasing: false });
    }

    continueOrder = () => this.props.history.push('/checkout');

    render() {
        const disabledInfo = { ...this.props.ingredients };
        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.isNetworkError
            ? <p style={{ textAlign: 'center' }}>Ingredients can't be fetched. Please check your network connection.</p>
            : <Spinner />

        if (this.props.ingredients) {
            burger = (
                <Fragment>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        add={(ingName) => this.props.addIngredient(ingName)}
                        remove={(ingName) => this.props.removeIngredient(ingName)}
                        disabled={disabledInfo}
                        price={this.props.totalPrice}
                        purchasable={this.updatePurchaseState()}
                        ordered={this.purchasing}
                    />
                </Fragment>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                ordered={this.purchasing}
                cancelled={this.modalClosed}
                continued={this.continueOrder}
                price={this.props.totalPrice}
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

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
        removeIngredient: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorhandler(BurgerBuilder, axios));