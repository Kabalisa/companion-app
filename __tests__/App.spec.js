import React from 'react';
import { shallow } from 'enzyme';
import App from '../src';

const props = {
  navigation: {
    navigate: jest.fn()
  }
};
describe('<App />', () => {
  test('should render correctly', () => {
    const tree = shallow(<App {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
