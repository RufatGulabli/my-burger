import React, { Component, Fragment } from 'react';
import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from './../../components/UI/Spinner/Spinner';
import WithErrorhandler from '../../HOC/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import { addIngredient, removeIngredient, initIngredients, setAuthRedirectPath } from '../../store/actions/index';

export class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchaseState() {
        const arr = Object.values(this.props.ingredients);
        const total = arr.reduce((acc, curr) => {
            return acc + curr;
        }, 0);
        return total > 0;
    }

    purchasing = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        } else {
            this.props.onSetLoginRedirectPath('/checkout');
            this.props.history.push('/login');
        }
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
        let burger = this.props.error
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
                        isAuth={this.props.isAuthenticated}
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
        ingredients: state.burger.ingredients,
        totalPrice: state.burger.totalPrice,
        error: state.burger.error,
        isAuthenticated: state.auth.idToken !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (ingName) => dispatch(addIngredient(ingName)),
        removeIngredient: (ingName) => dispatch(removeIngredient(ingName)),
        onInitIngredients: () => dispatch(initIngredients()),
        onSetLoginRedirectPath: (path) => dispatch(setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorhandler(BurgerBuilder, axios));