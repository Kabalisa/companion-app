import React from 'react';
import { shallow } from 'enzyme';
import { AsyncStorage } from 'react-native';
import Drawer from '../../index';

jest.mock('jwt-decode');

Object.defineProperty(AsyncStorage, 'getItem', {
  value: _value => new Promise((resolve) => {
    resolve('ThisIsMyAuthenticationToken');
  })
});

Object.defineProperty(AsyncStorage, 'removeItem', {
  value: _value => null
});

describe('Drawer', () => {
  let mountedComponent;
  let props;
  let instance;

  beforeEach(() => {
    props = {
      navigation: {
        navigate: jest.fn()
      }
    };
    mountedComponent = shallow(<Drawer {...props} />);
    instance = mountedComponent.instance();
  });

  it('renders Components in Drawer Container', () => {
    const profiles = mountedComponent.find('ProfileComponent');
    const LogoutButtons = mountedComponent.find('LogoutButton');
    expect(profiles.length).toBe(1);
    expect(LogoutButtons.length).toBe(1);
  });

  it('call function when logout button is clicked', () => {
    instance.logoutUser();
    expect(instance.props.navigation.navigate.mock.calls.length).toEqual(1);
  });

  it('call AsyncStorage.get in #componentDidMount', () => {
    jest.spyOn(AsyncStorage, 'getItem');
    instance.componentDidMount();
    expect(AsyncStorage.getItem).toHaveBeenCalled();
  });

  it('call AsyncStorage to return a token in #componentDidMount', () => (
    AsyncStorage.getItem('token').then((token) => {
      instance.componentDidMount();
      expect(token).toEqual('ThisIsMyAuthenticationToken');
    })
  ));
});
