import React from 'react';
import { shallow } from 'enzyme';
import HeaderLeft from '../HeaderLeft';

const wrapper = shallow(<HeaderLeft />);

describe('Navigation bar left part', () => {
  test('should render left part of navigation with correct icon', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
