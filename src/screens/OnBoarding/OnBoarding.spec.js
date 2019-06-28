import React from 'react';
import { shallow } from 'enzyme';
import OnBoarding from '.';
import slideImage1 from './components/assets/swipper1.png';
import navigationProps from '../../../__tests__/helpers/navigationProps';

const props = {
  slideImg: slideImage1,
  page1: 'pages',
  page2: 'pages',
  page3: 'pages',
  bodyText: 'test',
  slideTitle: 'test',
  navigation: {
    ...navigationProps.navigation
  }
};

console.error = jest.fn();

const componentWrapper = shallow(<OnBoarding {...props} />);

describe('Component Rendering', () => {
  test('should match the snapshot', () => {
    expect(componentWrapper).toMatchSnapshot();
  });
  test('should call go to greetings function', async () => {
    const wrapper = shallow(<OnBoarding {...props} />);
    const instance = wrapper.instance();
    wrapper.update();
    await instance.goToGreetings();
    instance.goToGreetings = jest.fn();
    expect(navigationProps.navigation.navigate).toBeCalled();
  });
});
