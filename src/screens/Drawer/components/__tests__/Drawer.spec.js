import React from 'react';
import { shallow } from 'enzyme';
import { AsyncStorage } from 'react-native';
import Drawer from '../../index';

jest.mock('jwt-decode');
jest.mock('react-native', () => ({
  StyleSheet: {
    create: () => ({})
  },
  AsyncStorage: {
    setItem: jest.fn(() => new Promise((resolve) => {
      resolve(null);
    })),
    getItem: jest.fn(() => new Promise((resolve) => {
      resolve('ThisIsMyAuthenticationToken');
    })),
    removeItem: jest.fn(() => new Promise((resolve) => {
      resolve(null);
    }))
  }
}));

describe('Drawer', () => {
  let mountedComponent;
  let props;

  beforeEach(() => {
    props = {
      navigation: {
        navigate: jest.fn()
      }
    };
    mountedComponent = shallow(<Drawer {...props} />);
  });

  it('renders Components in Drawer Container', () => {
    const profiles = mountedComponent.find('ProfileComponent');
    const LogoutButtons = mountedComponent.find('LogoutButton');
    expect(profiles.length).toBe(1);
    expect(LogoutButtons.length).toBe(1);
  });

  it('call function when logout button is clicked', () => {
    const instance = mountedComponent.instance();
    instance.logoutUser();
    expect(instance.props.navigation.navigate.mock.calls.length).toEqual(1);
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
