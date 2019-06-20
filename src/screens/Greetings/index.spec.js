import React from 'react';
import { Platform } from 'react-native';
import { shallow } from 'enzyme';

import GreetingsScreen from './index';

const wrapper = shallow(<GreetingsScreen />);
const wrapperInstance = wrapper.instance();

describe('Greetings scree', () => {
  test('should render greetings screen', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should simulate the onSend message method', () => {
    expect(wrapperInstance.onSend()).toMatchSnapshot();
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
    const navigationOptions = GreetingsScreen.navigationOptions();
    expect(navigationOptions).toHaveProperty('headerLeft');
    expect(navigationOptions).toHaveProperty('headerRight');
  });

  test('should return the navigation options', () => {
    const sendMessage = jest.spyOn(wrapperInstance, 'onSend');
    const Chat = wrapper.find('[testID="GiftedChat"]').at(0);
    Chat.props().onSend({ text: 'hello world' });
    expect(sendMessage).toHaveBeenCalled();
  });

  test('should mount the keyboard spacer if the platform is not iOS', () => {
    Platform.OS = 'android';
    const shallowComponent = shallow(<GreetingsScreen />);
    expect(shallowComponent).toMatchSnapshot();
  });
});
