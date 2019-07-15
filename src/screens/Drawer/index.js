import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
import ProfileComponent from './components/ProfileComponent';
import LogoutButton from './components/LogoutButton';

import styles from './styles';

export default class Drawer extends Component {
  state = {
    email: '',
    lastName: '',
    firstName: '',
    picture: ''
  };

  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      const decoded = jwtDecode(token);
      const {
        UserInfo: {
          email, lastName, firstName, picture
        }
      } = decoded;
      this.setState({
        email,
        lastName,
        firstName,
        picture
      });
    });
  }

  logoutUser = () => {
    const {
      navigation: { navigate }
    } = this.props;
    AsyncStorage.removeItem('token');
    navigate('Login');
  };

  render() {
    const {
      email, lastName, firstName, picture
    } = this.state;
    return (
      <View style={styles.drawerContainer}>
        <ProfileComponent userData={{
          email, firstName, lastName, picture
        }}
        />
        <LogoutButton onPress={this.logoutUser} />
      </View>
    );
  }
}

Drawer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  })
};

Drawer.defaultProps = {
  navigation: {
    navigate: () => {}
  }
};
