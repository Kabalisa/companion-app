import React from 'react';
import { AsyncStorage } from 'react-native';
import * as Google from 'expo-app-auth';
import { shallow } from 'enzyme';
import LoginContainer from './index';
import navigationProps from '../../../__tests__/helpers/navigationProps';

jest.useFakeTimers();
const [show] = Array(1).fill(jest.fn());
const accessToken = 'converge673companion25appa-kjahdfkjah-akjdfhakjfh';

const props = {
  navigation: {
    ...navigationProps.navigation
  }
};

const componentWrapper = shallow(<LoginContainer {...props} />);
const instance = componentWrapper.instance();
instance.toast = {
  show
};
instance.forceUpdate();

describe('Login Container', () => {
  beforeEach(() => {
    jest.spyOn(AsyncStorage, 'multiSet');
    global.fetch = jest.fn().mockImplementation(() => ({
      json: () => Promise.resolve(true),
      ok: true
    }));
  });

  afterEach(() => {
    AsyncStorage.multiSet.mockClear();
    navigationProps.navigation.navigate.mockClear();
    show.mockClear();
  });

  test('should match snapshot', () => {
    const toast = componentWrapper.find(`[testId="toast-notification"]`);
    expect(componentWrapper).toMatchSnapshot();
    expect(toast).toBeTruthy();
  });

  test('should catch error if Google auth failed', async () => {
    Google.authAsync = jest.fn().mockImplementationOnce(() => ({
      type: 'canceled'
    }));
    await componentWrapper.props().handleLoginPress();
    expect(AsyncStorage.multiSet).not.toHaveBeenCalled();
    expect(instance.state.authenticating).toBe(false);
  });

  test('should respond to Google auth button onPress', async () => {
    Google.authAsync = jest.fn().mockImplementationOnce(() => ({
      type: 'success',
      accessToken,
      refreshToken: accessToken
    }));
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({ token: accessToken }),
      ok: true
    }));
    jest.spyOn(instance, 'signInWithGoogle');
    instance.forceUpdate();
    expect(instance.state.authenticating).toBe(false);
    await componentWrapper.props().handleLoginPress();
    expect(instance.signInWithGoogle).toHaveBeenCalled();
    expect(AsyncStorage.multiSet).toHaveBeenCalled();
    expect(navigationProps.navigation.navigate).toBeCalled();
  });

  test('should respond to Google auth button onPress', async () => {
    Google.authAsync = jest.fn().mockImplementationOnce(() => ({
      type: 'success',
      accessToken
    }));
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({ error: 'Invalid account' }),
      ok: false,
      status: 401
    }));

    expect(instance.state.authenticating).toBe(false);
    await componentWrapper.props().handleLoginPress();
    expect(AsyncStorage.multiSet).not.toHaveBeenCalled();
    expect(show).toBeCalledWith('Invalid account', 3000);
  });

  test('should respond to Google auth button onPress', async () => {
    Google.authAsync = jest.fn().mockImplementationOnce(() => ({
      type: 'success',
      accessToken
    }));
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({ error: 'Something went wrong' }),
      ok: false
    }));
    expect(instance.state.authenticating).toBe(false);
    await componentWrapper.props().handleLoginPress();
    expect(AsyncStorage.multiSet).not.toHaveBeenCalled();
    expect(instance.state.error).not.toBe(null);
  });
  test('should button not respond if authenticating', () => {
    componentWrapper.setState({ authenticating: true });
    instance.forceUpdate();
    componentWrapper.props().handleLoginPress();
    expect(AsyncStorage.multiSet).not.toHaveBeenCalled();
    expect(instance.state.authenticating).toBe(true);
    expect(navigationProps.navigation.navigate).not.toBeCalled();
  });
});
