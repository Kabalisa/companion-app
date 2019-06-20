import React from 'react';
import { shallow } from 'enzyme';
import LoginContainer from './index';
import navigationProps from '../Greetings/components/__tests__/utils/navigationProps';

const componentWrapper = shallow(<LoginContainer {...navigationProps} />);

describe('Login Container', () => {
  test('should match snapshot', () => {
    expect(componentWrapper).toMatchSnapshot();
  });

  test('should respond to Google auth button onPress', () => {
    const instance = componentWrapper.instance();
    jest.spyOn(instance, 'signInWithGoogle');
    instance.forceUpdate();
    componentWrapper.props().handleLoginPress();
    expect(instance.signInWithGoogle).toHaveBeenCalled();
  });

  test('should return the null header', () => {
    const navigationOptions = LoginContainer.navigationOptions();
    expect(navigationOptions.header).toEqual(null);
  });
});
