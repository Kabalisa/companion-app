import React from 'react';
import { shallow } from 'enzyme';
import HeaderRight from '../HeaderRight';

const wrapper = shallow(<HeaderRight />);

describe('Navigation bar Right part', () => {
  test('should render right part of navigation with correct icon', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
