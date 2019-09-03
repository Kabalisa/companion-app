import React from 'react';
import { shallow } from 'enzyme';
import Message from '../Message';
import props from './utils/componentProps';
import screenshotHandler from '../../../../../__tests__/helpers/screenshotsHandler';

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
  const componentInitialMsg = shallow(<Message {...props} />);
  screenshotHandler(componentInitialMsg, 'should render the initial message');

  const wrapper = shallow(<Message {...newProps} />);
  screenshotHandler(wrapper, 'should render the user message');

  const componentSystemMsg = shallow(<Message {...props2} />);
  screenshotHandler(componentSystemMsg, 'should render the system message');

  props2.currentMessage.type = 'suggestion';
  const componentSuggestionMsg = shallow(<Message {...props2} />);
  screenshotHandler(
    componentSuggestionMsg,
    'should render a location suggestion message'
  );
});
