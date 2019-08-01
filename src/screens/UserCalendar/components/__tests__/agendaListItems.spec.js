import React from 'react';
import Renderer from 'react-test-renderer';
import AgendaListItems from '../AgendaListItems';
import data from '../../../../../__tests__/mock/calendar.json';

const props = {
  section: {
    data: [Object.values(data.events)],
    title: '10:00'
  }
};
const wrapper = Renderer.create(<AgendaListItems {...props} />);

describe('Agenda List Items', () => {
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
