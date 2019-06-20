import React from 'react';
import { shallow } from 'enzyme';
import SystemMessage from '../SystemMessage';

const props = {
  currentMessage: {
    text: 'Here is the calendar, book your meeting'
  }
};

const wrapper = shallow(<SystemMessage {...props} />);

describe('Gifted chat bot message', () => {
  test('should render the bot message', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
