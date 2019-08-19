import React from 'react';
import { TouchableOpacity } from 'react-native';
import { shallow } from 'enzyme';
import SuggestionMessage from '../SuggestionMessage';

const currentMessage = {
  text: 'I am currently on the first floor'
};

const props = {
  text: currentMessage.text,
  icon: 'md-walk',
  action: jest.fn()

};

const wrapper = shallow(
  <SuggestionMessage {...props} />
);

describe('Meeting room directions', () => {
  test('suggestion message for user location should be rendered', () => {
    expect(wrapper).toMatchSnapshot();
  });
  test('suggestion message for user location should be rendered', () => {
    const onPressEvent = jest.fn();
    onPressEvent.mockReturnValue('Link on press invoked');
    const wrapper2 = shallow(<SuggestionMessage {...props} />);
    wrapper2.find(TouchableOpacity).first().props().onPress();
    expect(onPressEvent.mock.calls.length).toBe(0);
  });
});
