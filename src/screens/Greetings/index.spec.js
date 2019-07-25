import React from 'react';
import { Platform, Alert, AsyncStorage } from 'react-native';
import { shallow } from 'enzyme';
import moxios from 'moxios';
import navigationProps from '../../../__tests__/helpers/navigationProps';
import { GreetingsScreen } from './index';

jest.mock('jwt-decode');

const props = {
  ...navigationProps,
  sendMessages: jest.fn()
};

const wrapper = shallow(<GreetingsScreen {...props} />);
const wrapperInstance = wrapper.instance();

describe('Greetings screen', () => {
  test('should render greetings screen', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should simulate the onSend message method', () => {
    const text = { text: 'hello companion' };
    expect(wrapperInstance._onSend(text)).toMatchSnapshot();
  });

  test('should render the input toolbar correctly', () => {
    expect(wrapperInstance.renderInputToolbar()).toMatchSnapshot();
  });

  test('should render the send button', () => {
    expect(wrapperInstance.renderSend()).toMatchSnapshot();
  });

  test('should render the new message', () => {
    expect(wrapperInstance.renderMessage()).toMatchSnapshot();
  });

  test('should return the navigation options', () => {
    const naviProps = {
      navigation: { state: { params: { picture: 'http://picurl' } } }
    };
    const navigationOptions = GreetingsScreen.navigationOptions(naviProps);
    expect(navigationOptions).toHaveProperty('headerLeft');
    expect(navigationOptions).toHaveProperty('headerRight');
  });

  test('should mount the keyboard spacer if the platform is not iOS', () => {
    Platform.OS = 'android';
    const shallowComponent = shallow(<GreetingsScreen />);
    expect(shallowComponent).toMatchSnapshot();
  });

  test('componentDidMount', () => {
    jest.mock('react-native', () => ({
      AsyncStorage: {
        getItem: jest.fn(
          () => new Promise((resolve) => {
            resolve(null);
          })
        )
      }
    }));
    return AsyncStorage.getItem('token').then((token) => {
      expect(token).toEqual(null);
    });
  });
});

describe('Interactions with the bot', () => {
  const result = {
    queryResult: {
      fulfillmentMessages: [
        {
          text: 'here is your message',
          payload: { botEmail: 'hello@hello.com' }
        }
      ]
    }
  };
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should handle google DialogFlow response with response ', () => {
    wrapper.instance().handleGoogleResponse(result);
  });

  it('should handle google DialogFlow response with error ', () => {
    jest.mock('Alert', () => ({
      alert: jest.fn()
    }));
    const spy = jest.spyOn(Alert, 'alert');
    wrapper.instance().handleGoogleResponse({
      error: {
        code: 403,
        status: 'Permission denied',
        message: 'something went wrong'
      }
    });
    expect(spy).toHaveBeenCalled();
  });

  it('should handle bot response ', async () => {
    wrapper.instance().sendBotResponse('Hello world');
  });
});
