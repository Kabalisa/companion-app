import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage } from 'react-native';
import Toast from 'react-native-easy-toast';
import Login from './components/Login';
import { getJwtToken, getAccessToken } from '../../services/AuthService';
import styles from './components/styles';

export default class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticating: false };
    this.toast = null;
  }

  signInWithGoogle = async () => {
    const { authenticating } = this.state;
    if (authenticating) return;
    this.setState({
      authenticating: true
    });
    try {
      const { accessToken, refreshToken, currentUser } = await getAccessToken();
      const { token } = await getJwtToken(accessToken);
      const user = await JSON.stringify(currentUser);
      await AsyncStorage.multiSet(
        [
          ['accessToken', accessToken],
          ['refreshToken', refreshToken],
          ['token', token],
          ['currentUser', user]
        ],
        this.handleNavigate
      );
    } catch (error) {
      this.setState({ authenticating: false });
      let { message } = error;
      if (message.includes('cancel')) message = 'You cancelled the login process.';
      this.toast.show(message, 5000);
    }
  };

  handleNavigate = async () => {
    const {
      navigation: { navigate }
    } = this.props;
    const onBoarded = await AsyncStorage.getItem('onBoard');
    this.setState({ authenticating: false });
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
          ref={(ref) => {
            this.toast = ref;
          }}
          style={styles.toastStyles}
          positionValue={60}
          position="bottom"
          opacity={1}
          testId="toast-notification"
        />
      </Login>
    );
  }
}

LoginContainer.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired
};

LoginContainer.defaultProps = {};
