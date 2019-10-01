import React, { Component } from 'react';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    render() {

        const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>
                    :  {this.props.ingredients[igKey]}
                </li>
            )
        });

        return (
            <React.Fragment>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkoout?</p>
                <Button btnType="Danger" click={this.props.cancelled}>CANCEL</Button>
                <Button btnType="Success" click={this.props.continued}>CONTINUE</Button>
            </React.Fragment>

        );
    }
}

export default OrderSummary;