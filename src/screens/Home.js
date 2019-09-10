import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppLoading } from 'expo';
import { refreshAuth } from '../services/AuthService';
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
    const { navigation } = this.props;
    return isLoading && (
      <AppLoading
        startAsync={this.bootstrapAsync}
        onFinish={() => this.setState({ isLoading: false })}
        onError={() => navigation.navigate('Auth')}
        testId="app-loading"
      />
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
    navigate: () => { }
  }
};

export default Home;
