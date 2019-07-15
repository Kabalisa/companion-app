import React, { Component } from 'react';
import {
  View, Image, SafeAreaView, Text, AsyncStorage
} from 'react-native';
import PropTypes from 'prop-types';
import { AppLoading } from 'expo';

import styles from '../shared/styles/splashLogin';
import AndelaLogo from '../assets/andela.png';
import AppLogo from '../assets/icon.png';

class Home extends Component {
  state = {
    isLoading: true
  };

  bootstrapAsync = async () => {
    const {
      navigation: { navigate }
    } = this.props;
    const token = await AsyncStorage.getItem('token');
    navigate(token ? 'Main' : 'Auth');
  };

  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return (
        <AppLoading
          startAsync={this.bootstrapAsync}
          onFinish={() => this.setState({ isLoading: true })}
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
  }).isRequired
};
export default Home;
