import React from 'react';
import { shallow } from 'enzyme';

import Home from '../../src/screens/Home';

describe('<App />', () => {
  test('should render correctly', () => {
    const tree = shallow(<Home />);
    expect(tree).toMatchSnapshot();
  });
});
