import React, { Component } from 'react';
import Modal from './../../components/UI/Modal/Modal';

// this is global error handler
const WithErrorhandler = (WrappedComponent, axios) => {

    return class extends Component {

        constructor(props) {
            super(props);
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });
            this.respInterceptorp = axios.interceptors.response.use(resp => resp, error => this.setState({ error: error }));
        }

        state = {
            error: null
        }

        errorConfirmed = () => {
            this.setState({ error: null });
        }

        // To prevent memory leaks
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.respInterceptorp);
        }

        render() {
            return (
                <React.Fragment>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmed}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </React.Fragment>
            );
        }
    }
}

export default WithErrorhandler;