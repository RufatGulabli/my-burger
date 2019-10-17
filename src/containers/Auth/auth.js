import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { connect } from 'react-redux';
import { login, setAuthRedirectPath } from '../../store/actions/index';
import classes from './Auth.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {
    state = {
        loginForm: {
            email: {
                elementType: 'input',
                config: {
                    type: 'email',
                    placeholder: 'Your Email',
                },
                value: '',
                validation: {
                    required: true,
                    isMail: true
                },
                isValid: false,
                touched: false,
                errorMsg: 'Invalid email format.'
            },
            password: {
                elementType: 'input',
                config: {
                    type: 'password',
                    placeholder: 'Your Password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 7
                },
                isValid: false,
                touched: false,
                errorMsg: 'Password is required'

            }
        },
        formIsValid: false,
        isSignUp: false,
    }

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath) {
            this.props.onSetRedirectPath();
        }
    }

    checkValidity = (rules, value) => {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.trim().length >= rules.minLength && isValid;
        }
        if (rules.isMail) {
            const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
            isValid = pattern.test(value) && isValid;
        }
        return isValid;
    }

    onChangeHandler = (event, controlName) => {
        const updatedLoginForm = {
            ...this.state.loginForm,
            [controlName]: {
                ...this.state.loginForm[controlName],
                value: event.target.value,
                isValid: this.checkValidity(this.state.loginForm[controlName].validation, event.target.value),
                touched: true
            }
        }
        this.setState({ loginForm: updatedLoginForm });
    }

    submitHandler = (e) => {
        e.preventDefault();
        const { email, password } = this.state.loginForm;
        this.props.login(email.value, password.value, this.state.isSignUp);
    }

    switchAuthMode = () => {
        this.setState(prevState => { return { isSignUp: !prevState.isSignUp } });
    }

    render() {
        const formElementsArr = [];
        for (let key in this.state.loginForm) {
            formElementsArr.push({
                id: key,
                config: this.state.loginForm[key],
                isValid: this.state.loginForm[key].isValid,
                touched: this.state.loginForm[key].touched,
                errorMsg: this.state.loginForm[key].errorMsg
            });
        }
        let form = formElementsArr.map(elem => {
            return (
                <Input key={elem.id}
                    elementType={elem.config.elementType}
                    elementConfig={elem.config.config}
                    value={elem.value}
                    invalid={!elem.isValid}
                    touched={elem.touched}
                    errorMsg={elem.errorMsg}
                    changed={(event) => this.onChangeHandler(event, elem.id)} />)
        })
        let error = null;
        if (this.props.error) {
            error = (
                <p>{this.props.error.message}</p>
            )
        }

        let redirect = null;
        if (this.props.isAuthenticated) {
            redirect = <Redirect to={this.props.redirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {redirect}
                {error}
                {this.props.loading ? <Spinner /> :
                    <div>
                        <form onSubmit={this.submitHandler} >
                            {form}
                            <Button btnType="Success" validForm={true} type="submit">{this.state.isSignUp ? 'Register' : 'Login'}</Button>
                        </form>
                        <Button click={this.switchAuthMode} btnType="Danger" type="button">Switch To {this.state.isSignUp ? 'Sign In' : 'Sign Up'}</Button>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        loading: state.auth.loading,
        isAuthenticated: state.auth.idToken !== null,
        buildingBurger: state.burger.building,
        redirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (email, password, isSignUp) => dispatch(login(email, password, isSignUp)),
        onSetRedirectPath: () => dispatch(setAuthRedirectPath('/'))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth);