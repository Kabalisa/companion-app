import moment from 'moment';
import {
  flattenDeep, groupBy, mapValues, uniqBy
} from 'lodash';
import { AsyncStorage } from 'react-native';
import settings from '../constants/calendarSettings';

const isValidDate = (value) => {
  if (!value) {
    return false;
  }
  if (!new Date(value).getTime() || !moment(value).isValid) {
    return false;
  }
  return true;
};

export const formatDate = (value) => {
  if (isValidDate(value)) {
    return moment(value).format('YYYY-MM-DD');
  }
  return undefined;
};

export const getStartHour = (value) => {
  if (isValidDate(value)) {
    return moment(value)
      .startOf('hour')
      .format('HH:mm');
  }
  return undefined;
};

export const eventDuration = (start, end) => {
  const startTime = moment(new Date(start));
  const endTime = moment(new Date(end));
  const duration = endTime.diff(startTime, 'minutes');
  if (!duration) return undefined;
  return duration;
};
export const sample = (array = []) => {
  const results = array[Math.floor(Math.random() * array.length)];
  return results;
};

export const formatCalendarData = (data = []) => {
  if (!(data instanceof Array)) {
    return {};
  }
  const newDate = data.map((item) => {
    const event = {};
    ({
      id: event.id,
      sequence: event.sequence,
      status: event.status,
      location: event.location,
      creator: event.creator,
      organizer: event.organizer,
      end: event.end,
      start: event.start,
      originalStartTime: event.originalStartTime,
      summary: event.summary,
      color: event.color = {
        dot: settings.dotColors,
        event: settings.eventColors
      },
      userEmail: event.userEmail
    } = item);
    event.date = item.start && formatDate(item.start.dateTime);
    return event;
  });
  return groupBy(newDate, 'date');
};

export const markDayEvents = (dates = {}) => {
  const results = {};
  if (typeof dates !== 'object' || dates instanceof Array) {
    return results;
  }
  Object.keys(dates).forEach((key) => {
    const colors = flattenDeep(
      dates[key].map(date => ({
        key: date.id,
        color: date.color.dot
      }))
    );
    const dots = uniqBy(colors, 'color');
    results[key] = { dots };
  });
  return results;
};

export const getSelectedDayEvents = (events = []) => {
  if (!(events instanceof Array)) {
    return [];
  }

  const allEvents = mapValues(settings.hours, item => ({
    ...item,
    data: [[]]
  }));

  events.forEach((event) => {
    const startHour = event.start && getStartHour(event.start.dateTime);
    allEvents[startHour].data[0].push(event);
  });

  return Object.values(allEvents);
};

export const starOfMonth = date => moment(date)
  .startOf('month')
  .toISOString();
export const endOfMonth = date => moment(date)
  .endOf('month')
  .toISOString();
export const getMonth = date => moment(date).format('YYYY-MM');

export const getCurrentTime = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = Math.round((date.getMinutes() / 60) * 100) / 100;

  return hours + minutes;
};

/**
 * Fetch user emails from the andela API.
 * @param {keyWord} keyWord the keyword that helps identify a user.
 * @returns {text} the user email after successful fetch .
 */
export async function getUserEmail(keyWord) {
  this.setState({ text: keyWord });
  const text = keyWord.trim();
  if (text) {
    const token = await AsyncStorage.getItem('token');
    const attendeeData = await fetch(
      `https://api-prod.andela.com/api/v1/users/basic?search=${text}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    if (attendeeData) {
      const currentResults = await attendeeData.json();
      this.setState({ data: currentResults.values });
      return currentResults;
    }
  }
  this.setState({ data: [] });
  return text;
}
