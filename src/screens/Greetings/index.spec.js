import React from 'react';
import { Platform, Alert, AsyncStorage } from 'react-native';
import { shallow } from 'enzyme';
import moxios from 'moxios';
import { Dialogflow_V2 as DialogFlow } from 'react-native-dialogflow-text';
import navigationProps from '../../../__tests__/helpers/navigationProps';
import { GreetingsScreen, mapDispatchToProps } from './index';

jest.mock('jwt-decode');

const props = {
  ...navigationProps,
  sendMessages: jest.fn()
};

const result = {
  queryResult: {
    intent: { name: 'intent/random-intent' },
    fulfillmentText: 'here is your message',
    fulfillmentMessages: [
      {
        text: 'here is your message',
        payload: { botEmail: 'hello@hello.com' }
      }
    ]
  }
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

  test('render message on press', () => {
    wrapperInstance.renderMessage().props.onPress();
  });

  test('render sendUserEmail', async () => {
    jest.spyOn(AsyncStorage, 'getItem').mockImplementation(() => 'testwasShown');
    await wrapperInstance.sendUserEmail();
  });

  test('render sendUserEmail onPress', async () => {
    jest.spyOn(AsyncStorage, 'getItem').mockImplementation(() => null);
    jest.spyOn(AsyncStorage, 'setItem').mockImplementation(() => true);
    jest.spyOn(Alert, 'alert');
    await wrapperInstance.sendUserEmail();
    Alert.alert.mock.calls[0][2][1].onPress();
  });

  test('should simulate the onSend method Dialog flow query', async () => {
    const text = { text: 'hello companion' };
    jest.spyOn(DialogFlow, 'requestQuery');
    wrapperInstance._onSend(text);
    DialogFlow.requestQuery.mock.calls[0][1](result);
    expect(() => {
      DialogFlow.requestQuery.mock.calls[0][2]();
    }).toThrow();
  });

  test('should return the navigation options', () => {
    const naviProps = {
      navigation: { state: { params: { picture: 'http://picurl' } } }
    };
    const navigationOptions = GreetingsScreen.navigationOptions(naviProps);
    expect(navigationOptions).toHaveProperty('headerLeft');
    expect(navigationOptions).toHaveProperty('headerRight');
  });

  test('should test the navigation headerRight onPress', () => {
    const naviProps = {
      navigation: {
        state: { params: { picture: 'http://picurl' } },
        navigate: jest.fn()
      }
    };
    const navigationOptions = GreetingsScreen.navigationOptions(naviProps);
    navigationOptions.headerRight.props.onPress();
  });

  test('should mount the keyboard spacer if the platform is not iOS', () => {
    Platform.OS = 'android';
    jest.spyOn(AsyncStorage, 'getItem').mockImplementation(
      () => new Promise((resolve) => {
        resolve(null);
      })
    );
    const shallowComponent = shallow(<GreetingsScreen />);
    expect(shallowComponent).toMatchSnapshot();
  });

  test('componentDidMount', () => {
    jest.spyOn(AsyncStorage, 'getItem').mockImplementation(
      () => new Promise((resolve) => {
        resolve('test');
      })
    );
    return AsyncStorage.getItem('token').then((token) => {
      jest.spyOn(DialogFlow, 'setConfiguration');
      expect(token).toEqual('test');
    });
  });
});

describe('Interactions with the bot', () => {
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

describe('The mapDispatchToProps function', () => {
  let dispatch;
  let dispatchProp;
  beforeEach(() => {
    dispatch = jest.fn(() => Promise.resolve());
    dispatchProp = mapDispatchToProps(dispatch);
  });

  it('should dispacth getHotDesks when getHotDeskReport is called', () => {
    dispatchProp.sendMessages();
    expect(dispatch).toHaveBeenCalled();
  });
});
