import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Login from './components/Login';

export default class LoginContainer extends Component {
  static navigationOptions = () => ({
    header: null
  });

  state = {
    authenticating: false
  };

  signInWithGoogle = () => {
    const { navigation } = this.props;
    navigation.navigate('Greetings');
  };

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

LoginContainer.propTypes = {
  navigation: PropTypes.shape({})
};

LoginContainer.defaultProps = {
  navigation: {}
};
