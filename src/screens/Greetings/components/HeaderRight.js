import React from 'react';
import { Image } from 'react-native';
import checkedCalendar from './icons/calendar-checked.png';
import styles from './styles';

export default () => (
  <Image source={checkedCalendar} style={styles.navigationProfileAvatar} />
);
