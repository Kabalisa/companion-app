import React from 'react';
import { shallow } from 'enzyme';
import OnBoarding from '.';
import slideImage1 from './components/assets/swipper1.png';

const props = {
  slideImg: slideImage1,
  page1: 'pages',
  page2: 'pages',
  page3: 'pages',
  bodyText: 'test',
  slideTitle: 'test'
};

const componentWrapper = shallow(<OnBoarding {...props} />);

describe('Component Rendering', () => {
  test('should match the snapshot', () => {
    expect(componentWrapper).toMatchSnapshot();
  });
});
