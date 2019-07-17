import React from 'react';
import { shallow } from 'enzyme';
import Calendar from '../Calendar';

const props = {
  events: {},
  currentEvents: [],
  handleDateSelect: jest.fn(),
  selectedDate: '2019-07-05',
  navigation: {
    goBack: jest.fn()
  }
};
const wrapper = shallow(<Calendar {...props} />);

describe('User Calendar Component', () => {
  describe('Component Render', () => {
    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should handle navigation back', () => {
      const header = wrapper.find(`[testID="calendar-header"]`);
      header.props().goBack();
      expect(props.navigation.goBack).toBeCalled();
    });
    it('should should toggle calendar', () => {
      const instance = wrapper.instance();
      jest.spyOn(instance, 'toggleCalendar');
      instance.forceUpdate();
      const header = wrapper.find(`[testID="calendar-header"]`);
      header.props().onToggle();
      expect(instance.toggleCalendar).toBeCalled();
    });
  });
});
