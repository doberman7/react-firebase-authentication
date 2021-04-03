import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "../Navigation";
import LandingPage from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import HomePage from "../Home";
import AccountPage from "../Account";
import AdminPage from "../Admin";
import { withFirebase } from "../Firebase";

import * as ROUTES from "../../constants/routes";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }
  componentDidMount() {
    //onAuthStateChanged() receives a function as a parameter that has access to the authenticated user.
    //The passed function is called every time something changes for the authenticated user.
    //It is called when a user signs up, signs in, and signs out.
    //onAuthStateChanged() receives a function as a parameter that has access to the authenticated user.
    //The passed function is called every time something changes for the authenticated user.
    //It is called when a user signs up, signs in, and signs out.
    this.props.firebase.auth.onAuthStateChanged((authUser) => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Navigation authUser={this.state.authUser} />
          <hr />

          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route
            exact
            path={ROUTES.PASSWORD_FORGET}
            component={PasswordForgetPage}
          />
          <Route exact path={ROUTES.HOME} component={HomePage} />
          <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route exact path={ROUTES.ADMIN} component={AdminPage} />
        </div>
      </Router>
    );
  }
}

export default withFirebase(App);
