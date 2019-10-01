import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import styles from './Contact.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';

class Contact extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                config: {
                    type: 'text',
                    placeholder: 'Your Name',
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                touched: false,
                errorMsg: 'Name is required'
            },
            email: {
                elementType: 'input',
                config: {
                    type: 'email',
                    placeholder: 'Your Email',
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                touched: false,
                errorMsg: 'E-mail is required'
            },
            street: {
                elementType: 'input',
                config: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                touched: false,
                errorMsg: 'Street is required'
            },
            zipCode: {
                elementType: 'input',
                config: {
                    type: 'text',
                    placeholder: 'Postal Code',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                isValid: false,
                touched: false,
                errorMsg: 'Zip code is required and must be 5 simbols.'
            },
            city: {
                elementType: 'input',
                config: {
                    type: 'text',
                    placeholder: 'City',
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                touched: false,
                errorMsg: 'City is required'
            },
            country: {
                elementType: 'input',
                config: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                touched: false,
                errorMsg: 'Country is required'
            },
            deliveryMethod: {
                elementType: 'select',
                config: {
                    options: [
                        { value: 'fastest', showValue: 'Fastest' },
                        { value: 'cheapest', showValue: 'Cheapest' }
                    ]
                },
                value: 'fastest',
                validation: {},
                isValid: true
            },
        },
        loading: false,
        formIsValid: false
    }

    order = (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        const customer = {};
        for (let item in this.state.orderForm) {
            customer[item] = this.state.orderForm[item].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price.toFixed(2),
            customer
        }
        axios.post('/order.json', order)
            .then(resp => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => this.setState({ loading: false }));
    }

    checkValidity = (rules, value) => {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.trim().length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.trim().length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    onChangeHandler = (event, inputIdentifier) => {
        const updatedForm = { ...this.state.orderForm };
        const updatedFormEl = { ...updatedForm[inputIdentifier] };
        updatedFormEl.value = event.target.value;
        updatedForm[inputIdentifier] = updatedFormEl;
        updatedFormEl.isValid = this.checkValidity(updatedFormEl.validation, updatedFormEl.value);
        updatedFormEl.touched = true;
        let formIsValid = true;
        for (let identifier in updatedForm) {
            formIsValid = updatedForm[identifier].isValid && formIsValid;
        }
        this.setState({ orderForm: updatedForm, formIsValid: formIsValid });
    }

    render() {

        const formElementsArr = [];
        for (let key in this.state.orderForm) {
            if (this.state.orderForm[key] !== 'deliveryMethod')
                formElementsArr.push({
                    id: key,
                    config: this.state.orderForm[key],
                    isValid: this.state.orderForm[key].isValid,
                    touched: this.state.orderForm[key].touched,
                    errorMsg: this.state.orderForm[key].errorMsg
                });
        }

        let form = (
            <form onSubmit={this.order}>
                {
                    formElementsArr.map(elem => {
                        return (
                            <Input key={elem.id}
                                elementType={elem.config.elementType}
                                elementConfig={elem.config.config}
                                value={elem.config.value}
                                invalid={!elem.isValid}
                                touched={elem.touched}
                                errorMsg={elem.errorMsg}
                                changed={(event) => this.onChangeHandler(event, elem.id)} />)
                    })
                }
                <Button btnType="Success" validForm={this.state.formIsValid}>Order</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={styles.Contact}>
                <h3>Enter your contact data</h3>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(Contact);