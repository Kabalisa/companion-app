import React from 'react';
import Renderer from 'react-test-renderer';
import AgendaListItems from '../AgendaListItems';

const props = {
  section: {
    data: [[]],
    title: '10:00'
  }
};
const wrapper = Renderer.create(<AgendaListItems {...props} />);

describe('Agenda List Items', () => {
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
