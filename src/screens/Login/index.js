import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage } from 'react-native';
import Toast from 'react-native-easy-toast';
import Login from './components/Login';
import { getJwtToken, getAccessToken } from '../../services/AuthService';
import styles from './components/styles';

export default class LoginContainer extends Component {
  state = {
    authenticating: false,
    error: null
  };

  signInWithGoogle = async () => {
    const { authenticating } = this.state;
    if (authenticating) return;
    this.setState({
      authenticating: true,
      error: null
    });
    try {
      const { accessToken } = await getAccessToken();
      const { token } = await getJwtToken(accessToken);
      await AsyncStorage.setItem('token', token);
      this.handleNavigate();
    } catch (error) {
      this.setState({
        authenticating: false,
        error: error.message
      });
      this.refs.toast.show(error.message);
    }
  };

  handleNavigate = async () => {
    const {
      navigation: { navigate }
    } = this.props;
    const onBoarded = await AsyncStorage.getItem('onBoard');
    this.setState({
      authenticating: false
    });
    navigate(onBoarded ? 'Main' : 'OnBoarding');
  };

  render() {
    const { authenticating, error } = this.state;

    return (
      <Login
        handleLoginPress={this.signInWithGoogle}
        disabled={authenticating}
        error={error}
      >
        <Toast
          ref="toast"
          style={styles.toastStyles}
          positionValue={37}
          position="bottom"
          opacity={0.6}
        />
      </Login>
    );
  }
}

LoginContainer.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired
};
