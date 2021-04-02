import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";

import * as ROUTES from "../../constants/routes";

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);
//initialize the state of the component. It will capture user information such as username, email, and password. There will be a second password field/state for password confirmation.initialize the state of the component. It will capture user information such as username, email, and password. There will be a second password field/state for password confirmation.The state is initialized by an object destructuring. This way, we can use the initial state object to reset the state after a successful sign-up.
const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME); //The history object of the router can eventually be used in the onSubmit() class method. If a request resolves successfully, we can push any route to the history object. Since the pushed /home route is defined in our App component with a matching component to be rendered, the displayed page component will change after the redirect.
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };
  //he input fields need to update the local state of the component by using an onChange handler
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";
    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);
//Any component that goes in the withRouter() higher-order component gains access to all properties of the router.
// const SignUpForm = withRouter(withFirebase(SignUpFormBase)); //So, when the enhanced SignUpFormBase component is passed to the withRouter() higher-order component, it has access to the props of the router.
const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase); //We can use recompose to organize our higher-order components. Since the higher-order components don’t depend on each other, the order doesn’t matter. But it may be helpful to know that the compose function applies to the higher-order components from right to left
export default SignUpPage;

export { SignUpForm, SignUpLink };
