import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Calendar from './components/Calendar';
import data from '../../constants/sampleCalendar.json';
import { formatCalendarData, getSelectedDayEvents } from '../../utils/helpers';
import settings from '../../constants/calendarSettings';

const today = new Date().toISOString().split('T')[0];
export default class CalendarContainer extends Component {
  state = {
    events: {},
    currentEvents: [],
    selectedDate: today,
    error: {}
  };

  async componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({ isCalendarOpen: true });
    await this.getUserCalendar();
  }

  getUserCalendar = async () => {
    const eventsData = await data.items;
    const events = formatCalendarData(eventsData);
    const currentEvents = getSelectedDayEvents(events[today], settings.hours);
    this.setState({
      currentEvents,
      events
    });
  };

  handleDateSelect = (date) => {
    const { events } = this.state;
    const currentEvents = getSelectedDayEvents(events[date], settings.hours);
    this.setState({
      selectedDate: date,
      currentEvents
    });
  };

  render() {
    const {
      events, currentEvents, selectedDate, error
    } = this.state;
    const { navigation } = this.props;
    return (
      <Calendar
        events={events}
        currentEvents={currentEvents}
        handleDateSelect={this.handleDateSelect}
        selectedDate={selectedDate}
        error={error}
        testId="calendar-container"
        navigation={navigation}
      />
    );
  }
}

CalendarContainer.propTypes = {
  navigation: PropTypes.shape({
    setParams: PropTypes.func,
    getParam: PropTypes.func
  }).isRequired
};
