import { AsyncStorage } from 'react-native';
import { flattenDeep, uniqBy } from 'lodash';
import {
  starOfMonth,
  endOfMonth,
  formatCalendarData,
  getSelectedDayEvents
} from '../../utils/helpers';
import request from '../../utils/request';
import settings from '../../constants/calendarSettings';
import { G_CALENDAR_EVENTS } from '../../constants/apiUrls';
import {
  FETCHING_EVENTS,
  FETCHING_EVENTS_SUCCESS,
  FETCHING_EVENTS_FAILED,
  GET_SELECTED_DATE_EVENTS,
  HANDLE_CALENDAR_MONTH_CHANGE,
  PIN_USERS,
  UNPIN_USERS
} from './types';

const today = new Date().toISOString().split('T')[0];

export const fetchCalendars = async (email, date = today, colorIndex = 0) => {
  const accessToken = await AsyncStorage.getItem('accessToken');
  const timeMin = starOfMonth(date);
  const timeMax = endOfMonth(date);

  return request(
    `${G_CALENDAR_EVENTS(email)}&timeMin=${timeMin}&timeMax=${timeMax}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` }
    }
  ).then((datum) => {
    datum.items.forEach((element) => {
      Object.assign(element, {
        color: {
          dot: settings.dotColors[colorIndex],
          event: settings.eventColors[colorIndex]
        },
        userEmail: email
      });
    });
    return datum;
  });
};

export const getCalendarData = (...args) => async (dispatch) => {
  const [date = today, emails = []] = args;
  dispatch({
    type: FETCHING_EVENTS
  });
  try {
    const allEmails = ['primary', ...emails];
    const allData = await Promise.all(
      allEmails.map((user, index) => fetchCalendars(user, date, index))
    );

    const eventsData = flattenDeep(allData.map(datum => datum.items));
    const events = formatCalendarData(uniqBy([...eventsData], 'id'));
    const currentEvents = getSelectedDayEvents(events[today], settings.hours);
    dispatch({
      type: FETCHING_EVENTS_SUCCESS,
      payload: { currentEvents, events }
    });
  } catch (err) {
    const { error } = err;
    dispatch({
      type: FETCHING_EVENTS_FAILED,
      payload: error
    });
  }
};

export const getSelectedDateEvents = date => ({
  type: GET_SELECTED_DATE_EVENTS,
  payload: date
});

export const monthChange = date => ({
  type: HANDLE_CALENDAR_MONTH_CHANGE,
  payload: date
});

export const pinUser = (item, date, users) => (dispatch) => {
  const alternativeImage = 'https://cdn.iconscout.com/icon/free/png-512/account-profile-avatar-man-circle-round-user-30452.png';
  const user = {
    imageUrl: item.picture || alternativeImage,
    username: item.name,
    userId: item.id,
    email: item.email
  };
  dispatch(getCalendarData(date, users));
  dispatch({
    type: PIN_USERS,
    payload: user
  });
};

export const unpinUser = (email, date, users) => (dispatch) => {
  const newUsers = users.filter(user => user.email !== email);
  dispatch(getCalendarData(date, newUsers));
  dispatch({ type: UNPIN_USERS, payload: email });
};
