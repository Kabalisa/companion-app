import React from 'react';
import { Platform, AsyncStorage } from 'react-native';
import { shallow } from 'enzyme';
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
    expect(wrapperInstance._onSend()).toMatchSnapshot();
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

  test('should return the navigation options', () => {
    const sendMessage = jest.spyOn(wrapperInstance, '_onSend');
    const Chat = wrapper.find('[testID="GiftedChat"]').at(0);
    Chat.props().onSend({ text: 'hello world' });
    expect(sendMessage).toHaveBeenCalled();
  });

  test('should mount the keyboard spacer if the platform is not iOS', () => {
    Platform.OS = 'android';
    const shallowComponent = shallow(<GreetingsScreen {...props} />);
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
