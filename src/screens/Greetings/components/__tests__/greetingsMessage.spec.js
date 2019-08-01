import React from 'react';
import { AsyncStorage } from 'react-native';
import { shallow } from 'enzyme';
import GreetingsMessage from '../GreetingsMessage';

import { token } from '../../../../../__tests__/mock/data';

const props = {
  currentMessage: {
    text: ''
  },
  onPress: jest.fn()
};
jest.mock('jwt-decode');
const wrapper = shallow(<GreetingsMessage {...props} />);

describe('Greetings message', () => {
  let instance;
  beforeEach(() => {
    instance = wrapper.instance();
  });
  test('should render GreetingsMessage with correct message', async () => {
    AsyncStorage.setItem('token', token);
    await instance.forceUpdate();
    expect(wrapper).toMatchSnapshot();
  });
});
