import React, { Component } from 'react';
import Login from './components/Login';

export default class LoginContainer extends Component {
  state = {
    authenticating: false
  };

  signInWithGoogle = async () => {};

  render() {
    const { authenticating } = this.state;
    return (
      <Login
        handleLoginPress={this.signInWithGoogle}
        disabled={authenticating}
      />
    );
  }
}
