import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View, Image, SafeAreaView, Text
} from 'react-native';
import { AppLoading } from 'expo';
import { refreshAuth } from '../services/AuthService';
import styles from '../shared/styles/splashLogin';
import AndelaLogo from '../assets/andela.png';
import Logo from '../assets/icon.png';
import DINProBold from '../assets/fonts/DINPro-Bold.ttf';
import DINPro from '../assets/fonts/DINPro-Regular.ttf';
import { cacheImages, cacheFonts } from '../utils/caching';
import assets from '../assets';

class Home extends Component {
  state = { isLoading: true };

  bootstrapAsync = async () => {
    const imageAssets = await cacheImages([...assets]);
    const fonts = await cacheFonts({
      DINPro,
      DINProBold
    });

    const {
      navigation: { navigate }
    } = this.props;
    const isAuthenticated = await refreshAuth();
    navigate(isAuthenticated ? 'Main' : 'Auth');
    return Promise.all(imageAssets, fonts);
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
            <Image source={Logo} style={styles.appLogo} />
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
