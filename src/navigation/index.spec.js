import navigation from './index';

describe('navigation of the application', () => {
  test('should render the navigation', () => {
    expect(navigation).toMatchSnapshot();
  });
});
