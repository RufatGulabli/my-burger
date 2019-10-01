import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import Contact from './Contact/Contact';
import { connect } from 'react-redux';

class Checkout extends Component {

    OnCancelled = () => this.props.history.goBack();
    OnContinued = () => this.props.history.replace('/checkout/contact');

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.props.ingredients}
                    onCancel={this.OnCancelled}
                    onContinued={this.OnContinued} />
                <Route
                    path={this.props.match.path + '/contact'}
                    component={Contact} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);