import React from 'react';
import { shallow } from 'enzyme';
import Button from '../CalendarButton';

const [onPress] = Array(1).fill(jest.fn());
const props = {
  onPress,
  closeIcon: false
};
const componentWrapper = shallow(<Button {...props} />);

describe('Button', () => {
  describe('Component rendering', () => {
    test('should match snapshot', () => {
      expect(componentWrapper).toMatchSnapshot();
    });

    test('should button respond to onPress', () => {
      componentWrapper.props().onPress();
      expect(onPress).toBeCalled();
    });
  });
});
