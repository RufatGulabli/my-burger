import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Layout from './containers/Layout/Layout';
import Checkout from './containers/Checkout/Checkout';

class App extends Component {

  render() {
    return (
      <div>
        <Layout>
          <Route path="/checkout" component={Checkout} />
          <Route path="/" exact component={BurgerBuilder} />
        </Layout>
      </div>

    );
  }

}

export default App;
