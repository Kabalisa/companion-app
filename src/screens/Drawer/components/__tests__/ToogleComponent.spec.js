import React from 'react';
import { Platform } from 'react-native';
import { shallow } from 'enzyme';
import ToogleComponent from '../ToogleComponent';

describe('ToogleComponent test', () => {
  const props = {
    toogleSwitch: jest.fn(),
    switchValue: true
  };
  const secondProps = {
    toogleSwitch: jest.fn(),
    switchValue: false
  };
  it('it should render correctly with the switch on', () => {
    const wrapper = shallow(<ToogleComponent {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('it should render correctly with the switch off', () => {
    const wrapper = shallow(<ToogleComponent {...secondProps} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('it should render correctly with the Platform being android', () => {
    Platform.OS = 'android';
    const wrapper = shallow(<ToogleComponent {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
