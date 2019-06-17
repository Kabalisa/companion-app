import React from 'react';
import { shallow } from 'enzyme';
import LoginContainer from './index';

const componentWrapper = shallow(<LoginContainer />);

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
});
