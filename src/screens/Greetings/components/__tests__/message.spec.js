import React from 'react';
import { shallow } from 'enzyme';
import Message from '../Message';
import props from './utils/componentProps';

const newProps = {
  ...props,
  currentMessage: {
    _id: 2,
    createdAt: '2019-06-17T17:10:37.523Z',
    text: 'Hello world',
    user: {
      _id: 1,
      avatar: 6,
      name: 'Companion App'
    }
  }
};

const props2 = {
  ...props,
  currentMessage: {
    _id: 2,
    createdAt: '2019-06-17T17:10:37.523Z',
    text: 'Hello world',
    user: {
      _id: 2,
      avatar: 'hello',
      name: 'Companion App'
    }
  }
};

describe('Gifted chat message', () => {
  test('should render the initial message', () => {
    const wrapper = shallow(<Message {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should render the user message', () => {
    const wrapper = shallow(<Message {...newProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should render the system message', () => {
    const wrapper = shallow(<Message {...props2} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should render a location suggestion message', () => {
    props2.currentMessage.type = 'suggestion';
    const wrapper = shallow(<Message {...props2} />);
    expect(wrapper).toMatchSnapshot();
  });
});
