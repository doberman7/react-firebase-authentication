import React from 'react';
// enhance the HomePage component with the higher-order component and define the authorization condition for it:
import { withAuthorization } from '../Session';

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>
  </div>
);
//define the authorization condition for it:
const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);