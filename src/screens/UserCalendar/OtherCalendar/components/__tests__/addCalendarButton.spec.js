import React from 'react';
import { shallow } from 'enzyme';
import AddCalendarButton from '../addCalendarButton';

const props = {
  onPress: jest.fn()
};
const wrapper = shallow(<AddCalendarButton {...props} />);

describe('User AddCalendarButton Component', () => {
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
