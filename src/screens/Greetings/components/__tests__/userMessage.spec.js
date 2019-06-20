import React from 'react';
import { shallow } from 'enzyme';
import UserMessage from '../UserMessage';

const props = {
  currentMessage: {
    text: 'Book an instant meeting'
  }
};
const wrapper = shallow(<UserMessage {...props} />);

describe('Gifted chat user message', () => {
  test('should render the user message', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
