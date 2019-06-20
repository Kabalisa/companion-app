import React from 'react';
import { shallow } from 'enzyme';
import GreetingsMessage from '../GreetingsMessage';
import props from './utils/componentProps';

const wrapper = shallow(<GreetingsMessage {...props} />);

describe('Greetings message', () => {
  test('should render GreetingsMessage with correct message', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
