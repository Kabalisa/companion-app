import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View, Image, SafeAreaView, Text
} from 'react-native';
import { AppLoading } from 'expo';
import styles from '../shared/styles/splashLogin';
import AndelaLogo from '../assets/andela.png';
import AppLogo from '../assets/icon.png';
import { refreshAuth } from '../services/AuthService';

class Home extends Component {
  state = { isLoading: true };

  bootstrapAsync = async () => {
    const {
      navigation: { navigate }
    } = this.props;
    const isAuthenticated = await refreshAuth();
    navigate(isAuthenticated ? 'Main' : 'Auth');
  };

  render() {
    const { isLoading } = this.state;
    const {
      navigation: { navigate }
    } = this.props;
    if (isLoading) {
      return (
        <AppLoading
          startAsync={this.bootstrapAsync}
          onFinish={() => this.setState({ isLoading: false })}
          onError={() => navigate('Auth')}
          testId="app-loading"
        />
      );
    }
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.appLogoContainer}>
            <Image source={AppLogo} style={styles.appLogo} />
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Companion</Text>
          </View>
          <View style={styles.andelaLogoContainer}>
            <Image
              source={AndelaLogo}
              style={styles.andelaLogo}
              resizeMode="contain"
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  })
};

Home.defaultProps = {
  navigation: {
    navigate: () => {}
  }
};

export default Home;
