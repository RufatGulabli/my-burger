import React, { Component, Suspense } from 'react';
import { Route } from 'react-router-dom';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Layout from './containers/Layout/Layout';
import Checkout from './containers/Checkout/Checkout';
import Auth from './containers/Auth/auth';
import Logout from './containers/Auth/Logout/Logout';
// import Orders from './containers/Orders/Orders';
const Orders = React.lazy(() => import('./containers/Orders/Orders'));

class App extends Component {

  render() {
    return (
      <div>
        <Layout>
          <Route path="/checkout" component={Checkout} />
          <Route path="/login" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route path="/orders" render={() => (<Suspense fallback={<div>Loading</div>}><Orders /></Suspense>)} />
          <Route path="/" exact component={BurgerBuilder} />
        </Layout>
      </div>

    );
  }

}

export default App;
