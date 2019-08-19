import React from 'react';
import {
  TouchableOpacity, View, Text
} from 'react-native';
import styles from './styles';

const SaveAttendeeButton = () => (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.button}
    >
      <Text style={[styles.countText]}> Add Attendees </Text>
    </TouchableOpacity>
  </View>
);


export default SaveAttendeeButton;
