import React from 'react';
import { shallow } from 'enzyme';
import AgendaListItems from '../AgendaListItems';

const props = {
  section: {
    data: [[]],
    title: '10:00'
  }
};
const wrapper = shallow(<AgendaListItems {...props} />);

describe('User Calendar Component', () => {
  describe('Component Render', () => {
    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
