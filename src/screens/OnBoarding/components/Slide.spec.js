import React from 'react';
import { shallow } from 'enzyme';
import Slide from './Slide';
import slideImage1 from './assets/swipper1.png';

const props = {
  slideImg: slideImage1,
  page1: 'pages',
  page2: 'pages',
  page3: 'pages',
  bodyText: 'test',
  slideTitle: 'test',
  skipOnBoarding: jest.fn()
};

const componentWrapper = shallow(<Slide {...props} />);

describe('Component Rendering', () => {
  test('should match the snapshot', () => {
    expect(componentWrapper).toMatchSnapshot();
  });
});
