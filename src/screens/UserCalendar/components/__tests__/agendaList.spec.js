import React from 'react';
import { shallow } from 'enzyme';
import AgendaList from '../AgendaList';

const props = {
  currentEvents: []
};
const wrapper = shallow(<AgendaList {...props} />);

describe('User AgendaList Component', () => {
  describe('Component Render', () => {
    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
