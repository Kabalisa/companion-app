import React from 'react';
import { shallow } from 'enzyme';
import ExpandableCalendar from '../ExpandableCalendar';

const props = {
  selected: '2019-07-09',
  dots: {}
};
const wrapper = shallow(<ExpandableCalendar {...props} />);

describe('User Calendar Component', () => {
  describe('Component Render', () => {
    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
