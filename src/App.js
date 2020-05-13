import React, { useEffect, Suspense } from 'react';
import './App.css';
import Layout from './components/Layouts/Layout';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';


const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
})

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
})

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
})



const App = props => {

  useEffect(() => {
    props.onTryAutoSignUp();
  })



  let route =
    <Switch>
      <Route path="/auth" render={props => <Auth {...props} />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to='/' />
    </Switch>
  if (props.isAuthenticated) {
    route =
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/checkout" render={props => <Checkout {...props} />} />
        <Route path="/orders" render={props => <Orders {...props} />} />
        <Route path="/auth" render={props => <Auth {...props} />} />
        <Route path="/logout" component={Logout} />
        <Redirect to='/' />
      </Switch>
  }
  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{route}</Suspense>
      </Layout>
    </div>
  );
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
