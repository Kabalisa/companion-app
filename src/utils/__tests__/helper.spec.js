import { flattenDeep } from 'lodash';
import {
  formatDate,
  getStartHour,
  eventDuration,
  sample,
  formatCalendarData,
  markDayEvents,
  getSelectedDayEvents,
  getCurrentTime,
  handleHints
} from '../helpers';
import calendarDate from '../../../__tests__/mock/calendar.json';
import settings from '../../constants/calendarSettings';

const date = '2019-06-05';
describe('Helper Functions', () => {
  require.requireActual('moment-timezone').tz.setDefault('Africa/Kigali');
  test('should return data in YYY-MM-DD format', () => {
    expect(formatDate('2019-05-15T14:55:59.000Z')).toEqual('2019-05-15');
    expect(formatDate()).toBeUndefined();
    expect(formatDate('')).toBeUndefined();
    expect(formatDate('hello')).toBeUndefined();
  });
  test('should round down to nearest hour', () => {
    expect(getStartHour('2019-05-15T14:55:59.000Z')).toEqual('16:00');
    expect(getStartHour('hello')).toBeUndefined();
    expect(getStartHour('')).toBeUndefined();
    expect(getStartHour('78ad')).toBeUndefined();
  });
  test('should calculate the time difference in  minutes', () => {
    expect(
      eventDuration('2019-05-15T14:55:59.000Z', '2019-05-15T15:55:59.000Z')
    ).toBe(60);
    expect(eventDuration('2019-05-15T14:55:59.000Z', 'kjaf')).toBeUndefined();
  });

  test('should return random element of any array', () => {
    const array = [1, 4, 4, 5, 6, 7];
    expect(array.includes(sample(array))).toBeTruthy();
    expect(['a', 'b'].includes(sample(array))).toBeFalsy();
    expect([].includes(sample())).toBeFalsy();
  });
  test('should return formated calendar date', async () => {
    calendarDate.items[0].visibility = 'private';
    calendarDate.items[0].userEmail = 'test@user.com';
    const formatedDates = formatCalendarData(calendarDate.items);
    expect(formatCalendarData()).toEqual({});
    expect(formatedDates).toHaveProperty(date);
    expect(formatedDates[date] instanceof Array).toBeTruthy();
    expect(formatedDates[date][0]).toHaveProperty('date');
    expect(formatCalendarData('kajfd')).toStrictEqual({});
    expect(formatCalendarData(6)).toStrictEqual({});
  });
  test('should return date with events and color', () => {
    const { events } = calendarDate;
    const dotedEvents = markDayEvents(events);
    expect(dotedEvents).toHaveProperty(date);
    expect(dotedEvents[date]).toHaveProperty('dots');
    expect(dotedEvents[date].dots instanceof Array).toBeTruthy();
    expect(dotedEvents[date].dots[0] instanceof Object).toBeTruthy();
    expect(markDayEvents({})).toEqual({});
    expect(markDayEvents()).toEqual({});
    expect(markDayEvents('kjahf')).toEqual({});
    expect(markDayEvents([8])).toEqual({});
  });

  test('should return events for selected date', () => {
    const selectedDateEvents = getSelectedDayEvents(
      calendarDate.events[date],
      settings.hours
    );
    const flatResults = flattenDeep(selectedDateEvents[16].data);
    expect(getSelectedDayEvents('kjaf')).toStrictEqual([]);
    expect(selectedDateEvents instanceof Array).toBeTruthy();
    expect(selectedDateEvents[0]).toHaveProperty('data');
    expect(selectedDateEvents[0].data instanceof Array).toBeTruthy();
    expect(selectedDateEvents[0].data.length).toBe(1);
    expect(selectedDateEvents[0]).toHaveProperty('title', '00:00');
    expect(selectedDateEvents[0]).toHaveProperty('data');
    expect(selectedDateEvents[16].data.length).toBe(1);
    expect(flatResults.length).toBe(2);
    expect(Object.keys(flatResults[0])).toEqual(
      expect.arrayContaining([
        'id',
        'sequence',
        'status',
        'location',
        'creator',
        'organizer',
        'end',
        'start',
        'originalStartTime',
        'summary',
        'color'
      ])
    );
  });

  test('should get current time', () => {
    global.Date = jest.fn(() => ({
      getHours: () => 17,
      getMinutes: () => 0
    }));
    expect(getCurrentTime()).toEqual(17.0);
  });
  test('should add hints to date responses', () => {
    const botMessage = [
      {
        text: 'specify the meeting date'
      }
    ];
    const hintedResponce = handleHints(botMessage);
    expect(hintedResponce[0].text).toEqual(
      'specify the meeting date \n ie: 12 dec, 2019'
    );
  });
  test('should add hints to time responses', () => {
    const botMessage = [
      {
        text: 'at which time should this event be?'
      }
    ];
    const hintedResponce = handleHints(botMessage);
    expect(hintedResponce[0].text).toEqual(
      'at which time should this event be? \n ie: 2PM'
    );
  });
  test('should add hints to title responses', () => {
    const botMessage = [
      {
        text: 'Enter in the meeting title'
      }
    ];
    const hintedResponce = handleHints(botMessage);
    expect(hintedResponce[0].text).toEqual(
      'Enter in the meeting title \n ie: Andela-All meeting'
    );
  });
  test('should add hints to agenda responses', () => {
    const botMessage = [
      {
        text:
          'I think it may help the attendees if you specified the meeting agenda.'
      }
    ];
    handleHints(botMessage);
  });
  test('should add hints to directions responses', () => {
    const botMessage = [
      {
        text: 'What room would you like directions to?'
      }
    ];
    const hintedResponce = handleHints(botMessage);
    expect(hintedResponce[0].text).toEqual(
      'What room would you like directions to? \n ie: room-name'
    );
  });
  test('should add hints to attendees responses', () => {
    const botMessage = [
      {
        text: 'Who are you inviting?'
      }
    ];
    handleHints(botMessage);
  });
});
