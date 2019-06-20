import React from 'react';
import { shallow } from 'enzyme';
import MenuItem from '../MenuItem';

const wrapper = shallow(<MenuItem />);

describe('Available choices', () => {
  test('should render the menu item', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
