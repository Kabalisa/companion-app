import React from 'react';
import { shallow } from 'enzyme';
import UserCalendar from './index';
import navigation from '../../../__tests__/helpers/navigationProps';

const props = {
  ...navigation
};
const component = shallow(<UserCalendar {...props} />);

describe('User Calendar Component', () => {
  let instance;
  beforeEach(() => {
    instance = component.instance();
    jest.spyOn(instance, 'getUserCalendar');
  });

  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  test('should fetch user calendar data', async () => {
    await instance.componentDidMount();
    expect(instance.getUserCalendar).toHaveBeenCalled();
    expect(Object.keys(component.state().events).length).not.toEqual(0);
  });

  test('should change date on data press', () => {
    const container = component.find(`[testId="calendar-container"]`);
    container.props().handleDateSelect('2019-07-07');
    expect(component.state().selectedDate).toEqual('2019-07-07');
  });
});
