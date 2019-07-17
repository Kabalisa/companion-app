import moment from 'moment';
import { flattenDeep, groupBy, mapValues } from 'lodash';
import settings from '../constants/calendarSettings';

export const formatDate = (date) => {
  try {
    const isValid = moment(date).isValid();
    if (isValid) {
      return new Date(date).toISOString().split('T')[0];
    }
    return undefined;
  } catch (error) {
    return undefined;
  }
};
export const getStartHour = (value) => {
  try {
    const date = moment(value);
    if (date.isValid()) {
      return date.startOf('hour').format('HH:mm');
    }
    return undefined;
  } catch (error) {
    return undefined;
  }
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
      color: event.color = sample(settings.dotColors)
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
        color: date.color
      }))
    );

    const dots = colors.length > 3 ? colors.slice(2) : colors;
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
