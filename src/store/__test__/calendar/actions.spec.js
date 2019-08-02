import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  getCalendarData,
  pinUser,
  fetchCalendars,
  unpinUser
} from '../../calendar/actions';
import dummyEvents from '../../../../__tests__/mock/calendar.json';

const mockStore = configureStore([thunk]);
let store;
const today = new Date().toISOString().split('T')[0];

describe('Test calendar actions', () => {
  beforeEach(() => {
    store = mockStore({});
  });
  it('should do test getCalendarData action success ', async () => {
    store = mockStore({});

    return store.dispatch(getCalendarData()).then(() => {
      expect(store.getActions().length).toBeLessThanOrEqual(2);
    });
  });

  it('should do test getCalendarData action success ', async () => {
    store = mockStore({});
    jest.mock('react-native', () => ({
      AsyncStorage: {
        getItem: jest.fn(() => new Promise(resolve => resolve(null)))
      }
    }));
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      status: 500,
      json: () => Promise.resolve(dummyEvents)
    }));
    fetchCalendars();
    return store.dispatch(getCalendarData(today, ['ex@email.com'])).then(() => {
      expect(store.getActions().length).toBeLessThanOrEqual(2);
    });
  });

  it('should do test getCalendarData action success ', async () => {
    store = mockStore({});
    const item = {
      username: 'caleb',
      email: 'caleb@email.com',
      userId: 1
    };

    jest.mock('react-native', () => ({
      AsyncStorage: {
        getItem: jest.fn(() => new Promise(resolve => resolve()))
      }
    }));

    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      status: 200,
      json: () => Promise.resolve(dummyEvents)
    }));
    await store.dispatch(pinUser(item, today, item.email));
    await store.dispatch(unpinUser(item.email, null, [item]));
    expect(store.getActions().length).toBeLessThanOrEqual(4);
  });
});
