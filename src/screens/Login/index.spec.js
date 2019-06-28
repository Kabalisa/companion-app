import React from 'react';
import { AsyncStorage } from 'react-native';
import { Google } from 'expo';
import { shallow } from 'enzyme';
import LoginContainer from './index';
import navigationProps from '../../../__tests__/helpers/navigationProps';
const [show] = Array(1).fill(jest.fn());
const accessToken = 'converge673companion25appa-kjahdfkjah-akjdfhakjfh';

const props = {
  navigation: {
    ...navigationProps.navigation
  }
};
const refs = {
  toast: {
    show
  }
};
const componentWrapper = shallow(<LoginContainer {...props} />);
const instance = componentWrapper.instance();
instance.refs = refs;

describe('Login Container', () => {
  beforeEach(() => {
    jest.spyOn(AsyncStorage, 'setItem');
  });

  afterEach(() => {
    AsyncStorage.setItem.mockClear();
    navigationProps.navigation.navigate.mockClear();
    show.mockClear();
  });

  test('should match snapshot', () => {
    expect(componentWrapper).toMatchSnapshot();
  });

  test('should catch error if Google auth failed', async () => {
    Google.logInAsync = jest.fn().mockImplementationOnce(() => ({
      type: 'canceled'
    }));
    await componentWrapper.props().handleLoginPress();
    expect(AsyncStorage.setItem).not.toHaveBeenCalled();
    expect(instance.state.authenticating).toBe(false);
    expect(instance.state.error).not.toBe(null);
  });

  test('should respond to Google auth button onPress', async () => {
    Google.logInAsync = jest.fn().mockImplementationOnce(() => ({
      type: 'success',
      accessToken
    }));
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({ token: accessToken }),
        ok: true
      })
    );
    jest.spyOn(instance, 'signInWithGoogle');
    instance.forceUpdate();
    expect(instance.state.authenticating).toBe(false);
    await componentWrapper.props().handleLoginPress();
    expect(instance.signInWithGoogle).toHaveBeenCalled();
    expect(AsyncStorage.setItem).toHaveBeenLastCalledWith('token', accessToken);
  });

  test('should respond to Google auth button onPress', async () => {
    Google.logInAsync = jest.fn().mockImplementationOnce(() => ({
      type: 'success',
      accessToken
    }));
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({ error: 'Invalid email' }),
        ok: false,
        status: 401
      })
    );
    expect(instance.state.authenticating).toBe(false);
    await componentWrapper.props().handleLoginPress();
    expect(AsyncStorage.setItem).not.toHaveBeenCalled();
    expect(instance.state.error).toBe('Invalid email');
    expect(show).toBeCalledWith('Invalid email');
  });

  test('should respond to Google auth button onPress', async () => {
    Google.logInAsync = jest.fn().mockImplementationOnce(() => ({
      type: 'success',
      accessToken
    }));
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({ error: 'Something went wrong' }),
        ok: false
      })
    );
    expect(instance.state.authenticating).toBe(false);
    await componentWrapper.props().handleLoginPress();
    expect(AsyncStorage.setItem).not.toHaveBeenCalled();
    expect(instance.state.error).toBe('Something went wrong');
  });
  test('should button not respond if authenticating', () => {
    componentWrapper.setState({ authenticating: true });
    instance.forceUpdate();
    componentWrapper.props().handleLoginPress();
    expect(AsyncStorage.setItem).not.toHaveBeenCalled();
    expect(instance.state.authenticating).toBe(true);
    expect(navigationProps.navigation.navigate).not.toBeCalled();
  });
});
