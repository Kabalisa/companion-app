import React from 'react';
import { shallow } from 'enzyme';
import Button from '../SaveAttendeeButton';

const componentWrapper = shallow(<Button />);

describe('SaveAttendeesButton', () => {
  describe('Component rendering', () => {
    test('should match snapshot', () => {
      expect(componentWrapper).toMatchSnapshot();
    });
  });
});
