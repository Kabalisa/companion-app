import React from 'react';
import Swiper from 'react-native-swiper';
import Slide from './components/Slide';
import slideImage3 from './components/assets/swipper3.png';
import slideImage2 from './components/assets/swipper2.png';
import slideImage1 from './components/assets/swipper1.png';
import * as content from './components/constants';

const OnBoarding = () => (
  <Swiper loop={false} showsPagination={false} index={0}>
    <Slide
      slideTitle={content.slideTitle1}
      bodyText={content.slideBody1}
      slideImg={slideImage1}
      page1="currentPage"
      page2="pages"
      page3="pages"
    />
    <Slide
      slideTitle={content.slideTitle2}
      bodyText={content.slideBody2}
      slideImg={slideImage2}
      page1="pages"
      page2="currentPage"
      page3="pages"
    />
    <Slide
      slideTitle={content.slideTitle3}
      bodyText={content.slideBody3}
      subBody={content.subBody3}
      slideImg={slideImage3}
      page1="pages"
      page2="pages"
      page3="currentPage"
    />
  </Swiper>
);

export default OnBoarding;
