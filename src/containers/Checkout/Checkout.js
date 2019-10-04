import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import Contact from './Contact/Contact';
import { connect } from 'react-redux';

class Checkout extends Component {

    OnCancelled = () => this.props.history.goBack();
    OnContinued = () => this.props.history.replace('/checkout/contact');

    render() {
        let checkoutSummary = <Redirect to="/" />
        if (this.props.ingredients) {
            checkoutSummary = (
                <div>
                    <CheckoutSummary
                        ingredients={this.props.ingredients}
                        onCancel={this.OnCancelled}
                        onContinued={this.OnContinued} />
                    <Route
                        path={this.props.match.path + '/contact'}
                        component={Contact} />
                </div>
            )
        }
        return checkoutSummary;
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burger.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);