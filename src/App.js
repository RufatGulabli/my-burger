import React, { Component, Suspense } from 'react';
import { Route, withRouter, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Layout from './containers/Layout/Layout';
import Checkout from './containers/Checkout/Checkout';
import Logout from './containers/Auth/Logout/Logout';
import { getUserDetailsFromLocalStorage } from './store/actions/index';
// import Orders from './containers/Orders/Orders';
const Orders = React.lazy(() => import('./containers/Orders/Orders'));
const Auth = React.lazy(() => import('./containers/Auth/auth'));


class App extends Component {

  componentDidMount() {
    this.props.checkLocalStorageIfTokenExists();
  }


  render() {
    let routes = (
      <Switch>
        <Route path="/login" render={() => (<Suspense fallback={<div>Loading</div>}><Auth /></Suspense>)} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/logout" component={Logout} />
          <Route path="/login" render={() => (<Suspense fallback={<div>Loading</div>}><Auth /></Suspense>)} />
          <Route path="/orders" render={() => (<Suspense fallback={<div>Loading</div>}><Orders /></Suspense>)} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>

    );
  }

}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.idToken !== null
  }
}

const mapDispathToProps = dispatch => {
  return {
    checkLocalStorageIfTokenExists: () => dispatch(getUserDetailsFromLocalStorage())
  }
}

export default withRouter(connect(mapStateToProps, mapDispathToProps)(App));
