import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENTS_PRICE = {
    salad: 0.5,
    bacon: 1.8,
    cheese: 1.0,
    meat: 2.5
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 2.5,
        purchasable: false,
        purchasing: false
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
        alert(`You're continue...`);
    }

    render() {

        const disabledInfo = { ...this.state.ingredients };
        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.modalClosed}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        ordered={this.purchasing}
                        cancelled={this.modalClosed}
                        continued={this.continueOrder}
                        price={this.state.totalPrice}
                    />
                </Modal>
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
    }
}

export default BurgerBuilder;