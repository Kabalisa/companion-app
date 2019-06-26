import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage } from 'react-native';
import Login from './components/Login';
import { getJwtToken, getAccessToken } from '../../services/AuthService';
import Toast from 'react-native-easy-toast';
import styles from './components/styles';
export default class LoginContainer extends Component {
  state = {
    authenticating: false,
    error: null
  };

  signInWithGoogle = async () => {
    const { authenticating } = this.state;
    const {
      navigation: { navigate }
    } = this.props;
    if (authenticating) return;
    this.setState({
      authenticating: true,
      error: null
    });
    try {
      const { accessToken } = await getAccessToken();
      const { token } = await getJwtToken(accessToken);
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('accessToken', accessToken);
      this.setState({
        authenticating: false
      });
      navigate('OnBoarding');
    } catch (error) {
      this.setState({
        authenticating: false,
        error: error.message
      });
      this.refs.toast.show(error.message);
    }
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
  navigation: PropTypes.shape({}).isRequired
};
