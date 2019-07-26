import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { AgendaList as AgendaListComponent } from 'react-native-calendars';
import AgendaItemsList from './AgendaListItems';
import { calendarStyles as styles } from './styles';

const AgendaList = ({ currentEvents, extraData }) => (
  <ScrollView removeClippedSubviews overScrollMode="auto">
    <AgendaListComponent
      title=""
      sections={currentEvents}
      extraData={extraData}
      renderItem={({ section }) => <AgendaItemsList section={section} />}
      sectionStyle={styles.section}
      sectionScroll={false}
    />
  </ScrollView>
);
AgendaList.propTypes = {
  currentEvents: PropTypes.instanceOf(Array).isRequired,
  extraData: PropTypes.shape({})
};

AgendaList.defaultProps = {
  extraData: {}
};
export default AgendaList;
