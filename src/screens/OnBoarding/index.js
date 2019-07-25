import React, { Component } from 'react';
import Swiper from 'react-native-swiper';
import { AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';

import Slide from './components/Slide';
import { ConnectedGreetingsScreen } from '../Greetings';
import slideImage3 from './components/assets/swipper3.png';
import slideImage2 from './components/assets/swipper2.png';
import slideImage1 from './components/assets/swipper1.png';
import * as content from './components/constants';

class OnBoarding extends Component {
  componentDidMount() {
    this.onBoardingStatus();
  }

  onBoardingStatus = async () => {
    await AsyncStorage.setItem('onBoard', 'true');
  };

  goToGreetings = () => {
    const {
      navigation: { navigate }
    } = this.props;
    navigate('Greetings');
  };

  render() {
    return (
      <Swiper loop={false} showsPagination={false} index={0}>
        <Slide
          slideTitle={content.slideTitle1}
          bodyText={content.slideBody1}
          slideImg={slideImage1}
          skipOnBoarding={this.goToGreetings}
          page1="currentPage"
          page2="pages"
          page3="pages"
        />
        <Slide
          slideTitle={content.slideTitle2}
          bodyText={content.slideBody2}
          slideImg={slideImage2}
          skipOnBoarding={this.goToGreetings}
          page1="pages"
          page2="currentPage"
          page3="pages"
        />
        <Swiper
          onMomentumScrollEnd={this.goToGreetings}
          loop={false}
          showsPagination={false}
        >
          <Slide
            slideTitle={content.slideTitle3}
            bodyText={content.slideBody3}
            subBody={content.subBody3}
            slideImg={slideImage3}
            skipOnBoarding={this.goToGreetings}
            page1="pages"
            page2="pages"
            page3="currentPage"
          />
          <ConnectedGreetingsScreen />
        </Swiper>
      </Swiper>
    );
  }
}

OnBoarding.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired
};
export default OnBoarding;
