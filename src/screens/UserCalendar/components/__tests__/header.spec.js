import React from 'react';
import { shallow } from 'enzyme';
import Header from '../Header';

const props = {
  goBack: jest.fn(),
  onToggle: jest.fn(),
  isCalendarOpen: true,
  onSearchPress: jest.fn(),
  usersHeaderAvatar: [
    {
      imageUrl: 'https://mex.hello.png',
      username: 'Me You',
      userId: '345678'
    }
  ]
};
const component = shallow(<Header {...props} />);

describe('Calendar Header Component', () => {
  it('should should match the snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
