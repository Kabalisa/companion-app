import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { View, Text, Dimensions } from 'react-native';
import { scale } from 'react-native-size-matters';
import { agendaItem as styles } from './styles';
import { eventDuration } from '../../../utils/helpers';

const HORIZONTAL_LIST_WIDTH = Dimensions.get('window').width * 0.9;

const AgendaItem = ({ item, itemsLength }) => {
  const {
    start, end, summary, color
  } = item;
  const itemStyles = [styles.container];
  const duration = eventDuration(start.dateTime, end.dateTime);
  const minutes = new Date(start.dateTime).getMinutes();
  if (duration) {
    const height = scale(75) * (duration / 60);
    const top = scale(77) * (minutes / 60);
    itemStyles.push({
      marginTop: scale(2) + top,
      height,
      backgroundColor: color,
      width: HORIZONTAL_LIST_WIDTH / itemsLength
    });
  }
  return (
    <View style={itemStyles}>
      <Text style={styles.itemTitleText}>{summary}</Text>
      <Text style={styles.itemHours}>
        {moment(start.dateTime).format('LT')}
        {' '}
        {moment(end.dateTime).format('LT')}
      </Text>
    </View>
  );
};

AgendaItem.propTypes = {
  item: PropTypes.shape({
    dateTime: PropTypes.string,
    start: PropTypes.shape({
      dateTime: PropTypes.string
    }),
    end: PropTypes.shape({
      dateTime: PropTypes.string
    }),
    summary: PropTypes.string,
    color: PropTypes.string
  }).isRequired,
  itemsLength: PropTypes.number
};

AgendaItem.defaultProps = {
  itemsLength: 1
};
export default AgendaItem;
