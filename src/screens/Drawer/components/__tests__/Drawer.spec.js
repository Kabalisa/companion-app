import React from 'react';
import { shallow } from 'enzyme';
import { AsyncStorage } from 'react-native';
import * as Google from 'expo-app-auth';
import Drawer from '../../index';

jest.mock('jwt-decode');

const props = {
  navigation: {
    navigate: jest.fn()
  }
};
jest.mock('AsyncStorage', () => ({
  setItem: jest.fn(
    () => new Promise((resolve) => {
      resolve(null);
    })
  ),
  getItem: jest.fn(
    () => new Promise((resolve) => {
      resolve('ThisIsMyAuthenticationToken');
    })
  ),
  removeItem: jest.fn(
    () => new Promise((resolve) => {
      resolve(null);
    })
  )
}));

const mountedComponent = shallow(<Drawer {...props} />);
describe('Drawer', () => {
  beforeEach(() => {
    Google.revokeAsync = jest.fn().mockImplementationOnce(() => true);
  });

  it('renders Components in Drawer Container', () => {
    expect(mountedComponent).toMatchSnapshot();
  });

  it('call function when logout button is clicked', async () => {
    const instance = mountedComponent.instance();
    await instance.logoutUser();
    expect(props.navigation.navigate.mock.calls.length).toEqual(1);
  });

  it('call AsyncStorage.get in #componentDidMount', () => {
    const instance = mountedComponent.instance();
    instance.componentDidMount();
    expect(AsyncStorage.getItem).toHaveBeenCalled();
  });

  it('call AsyncStorage to return a token in #componentDidMount', () => {
    const instance = mountedComponent.instance();
    instance.componentDidMount();
    return AsyncStorage.getItem('token').then((token) => {
      instance.componentDidMount();
      expect(token).toEqual('ThisIsMyAuthenticationToken');
    });
  });
});
