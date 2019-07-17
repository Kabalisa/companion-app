import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native';
import { CalendarProvider, LocaleConfig } from 'react-native-calendars';
import AgendaItemsList from './AgendaListItems';
import calendarSettings from '../../../constants/calendarSettings';
import { markDayEvents } from '../../../utils/helpers';
import AgendaList from './AgendaList';
import ExpandableCalendar from './ExpandableCalendar';
import Header from './Header';
import { styles } from './styles';

LocaleConfig.locales.en = {
  monthNames: calendarSettings.monthNames,
  monthNamesShort: calendarSettings.monthNamesShort,
  dayNames: calendarSettings.dayNames,
  dayNamesShort: calendarSettings.dayNamesShort,
  today: calendarSettings.today
};
LocaleConfig.defaultLocale = 'en';

class Calendar extends Component {
  state = {
    isCalendarOpen: true
  };

  renderItem = ({ section }) => <AgendaItemsList section={section} />;

  navigateBack = () => {
    const { navigation } = this.props;
    navigation.goBack(null);
  };

  toggleCalendar = () => {
    this.setState(state => ({
      isCalendarOpen: !state.isCalendarOpen
    }));
  };

  render() {
    const {
      events,
      currentEvents,
      handleDateSelect,
      selectedDate
    } = this.props;
    const { isCalendarOpen } = this.state;
    const dots = markDayEvents(events);
    return (
      <SafeAreaView style={styles.container}>
        <Header
          goBack={this.navigateBack}
          onToggle={this.toggleCalendar}
          title=""
          closeIcon={isCalendarOpen}
          testID="calendar-header"
        />

        <CalendarProvider date="" onDateChanged={handleDateSelect}>
          {isCalendarOpen ? (
            <ExpandableCalendar dots={dots} selected={selectedDate} />
          ) : null}
          <AgendaList currentEvents={currentEvents} />
        </CalendarProvider>
      </SafeAreaView>
    );
  }
}
Calendar.propTypes = {
  events: PropTypes.shape({}).isRequired,
  currentEvents: PropTypes.instanceOf(Array).isRequired,
  handleDateSelect: PropTypes.func.isRequired,
  selectedDate: PropTypes.string.isRequired,
  navigation: PropTypes.shape({ goBack: PropTypes.func }).isRequired
};

export default Calendar;
