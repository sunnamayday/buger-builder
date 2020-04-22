import React from 'react';
import './App.css';
import Layout from './components/Layouts/Layout';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import { Component } from 'react';
import asyncComponent from './hoc/asyncComponent/asyncComponent';


const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
})

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
})

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
})


const asyncLogout = asyncComponent(() => {
  return import('./containers/Auth/Logout/Logout');
})

const asyncBurgerBuilder = asyncComponent(() => {
  return import('./containers/BurgerBuilder/BurgerBuilder');
})

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignUp();
  }



  render() {
    let route =
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={asyncBurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    if (this.props.isAuthenticated) {
      route =
        <Switch>
          <Route path="/" exact component={asyncBurgerBuilder} />
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/logout" component={asyncLogout} />
          <Redirect to='/' />
        </Switch>
    }
    return (
      <Layout>
        {route}
      </Layout>
    );
  }

}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
