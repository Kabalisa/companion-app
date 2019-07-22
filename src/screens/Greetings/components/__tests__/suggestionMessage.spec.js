import React from 'react';
import { shallow } from 'enzyme';
import SuggestionMessage from '../SuggestionMessage';

const currentMessage = {
  text: 'I am currently on the first floor'
};

const wrapper = shallow(
  <SuggestionMessage text={currentMessage.text} icon="md-walk" />
);

describe('Meeting room directions', () => {
  test('suggestion message for user location should be rendered', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
