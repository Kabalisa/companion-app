import React from 'react';
import Renderer from 'react-test-renderer';
import AgendaList from '../AgendaList';

const props = {
  currentEvents: []
};
const wrapper = Renderer.create(<AgendaList {...props} />);

describe('User AgendaList Component', () => {
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
