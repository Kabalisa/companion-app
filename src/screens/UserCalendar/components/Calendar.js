import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  SafeAreaView, View, Text, StatusBar
} from 'react-native';
import { CalendarProvider, LocaleConfig } from 'react-native-calendars';
import Modal from 'react-native-modalbox';
import calendarSettings from '../../../constants/calendarSettings';
import { markDayEvents } from '../../../utils/helpers';
import AgendaList from './AgendaList';
import ExpandableCalendar from './ExpandableCalendar';
import Header from './Header';
import Loading from '../../../shared/components/ActivityIndicator/Loading';
import PinnedUser from '../OtherCalendar/components/PinnedUser';
import { addCalendarStyles, styles } from './styles';
import SearchResults from '../OtherCalendar/components/SearchResults';
import SearchInput from '../OtherCalendar/components/SearchInput';

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

  navigateBack = () => {
    const { navigation } = this.props;
    navigation.goBack(null);
  };

  toggleCalendar = () => {
    this.setState(state => ({
      isCalendarOpen: !state.isCalendarOpen
    }));
  };

  handleMonthChange = (month) => {
    const { onMonthChange, pinnedUsers } = this.props;
    onMonthChange(month, pinnedUsers.map(user => user.email));
  };

  renderSearchBox = () => {
    const { getUserEmail, text } = this.props;
    return <SearchInput onTextChange={getUserEmail} value={text} />;
  };

  renderResult = () => {
    const { data, pinUser } = this.props;
    return <SearchResults data={data} pinUser={pinUser} />;
  };

  renderPinnedCalendar = () => {
    const { pinnedUsers, unpinUser } = this.props;
    return <PinnedUser pinnedUsers={pinnedUsers} removeUser={unpinUser} />;
  };

  openSearchModal = () => {
    this.modalRef.open();
  };

  render() {
    const { pinnedUsers } = this.props;
    const {
      events,
      currentEvents,
      handleDateSelect,
      selectedDate,
      isLoading,
      data
    } = this.props;
    const { isCalendarOpen } = this.state;
    const dots = markDayEvents(events);
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <Header
          onSearchPress={this.openSearchModal}
          goBack={this.navigateBack}
          onToggle={this.toggleCalendar}
          title=""
          closeIcon={isCalendarOpen}
          testID="calendar-header"
          usersHeaderAvatar={pinnedUsers}
        />
        <Modal
          style={addCalendarStyles.modalStyles}
          backButtonClose
          backdropOpacity={0.2}
          position="bottom"
          ref={(ref) => {
            this.modalRef = ref;
          }}
        >
          {pinnedUsers.length < 4 ? (
            this.renderSearchBox()
          ) : (
            <Text style={addCalendarStyles.searchText}>
              You can only view 4 calendars
            </Text>
          )}
          {data.length > 0 ? this.renderResult() : null}
          {this.renderPinnedCalendar()}
        </Modal>
        <CalendarProvider
          date=""
          onDateChanged={handleDateSelect}
          onMonthChange={this.handleMonthChange}
          testID="calendar-provider"
        >
          {isCalendarOpen ? (
            <View>
              <ExpandableCalendar dots={dots} selected={selectedDate} />
              {isLoading && <Loading size="small" color="#4D6EFF" />}
            </View>
          ) : null}

          <AgendaList currentEvents={currentEvents} extraData={events} />
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
  navigation: PropTypes.shape({ goBack: PropTypes.func }).isRequired,
  onMonthChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  getUserEmail: PropTypes.func.isRequired,
  pinUser: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  pinnedUsers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  unpinUser: PropTypes.func.isRequired
};

Calendar.defaultProps = {
  isLoading: false
};

export default Calendar;
