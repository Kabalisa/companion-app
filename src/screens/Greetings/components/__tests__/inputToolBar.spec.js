import React from 'react';
import { shallow } from 'enzyme';
import InputToolBar from '../InputToolBar';

const wrapper = shallow(<InputToolBar />);

describe('the input tool bar ', () => {
  test('should render the input tool bar ', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
