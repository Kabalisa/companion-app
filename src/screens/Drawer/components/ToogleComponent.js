import React from 'react';
import {
  View, Text, Switch, Platform
} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles';

const ToogleComponent = ({ toogleSwitch, switchValue }) => (
  <View style={styles.toogleContainer}>
    <Text style={styles.toogleButtonText}>
      response hints:
      {' '}
      {switchValue ? 'ON' : 'OFF'}
    </Text>
    <Switch
      onValueChange={toogleSwitch}
      value={switchValue}
      trackColor={{ true: 'rgba(4,89,228,1);', false: 'grey' }}
      thumbColor={Platform.OS === 'ios' ? '' : 'rgba(4,89,228,1);'}
    />
  </View>
);

ToogleComponent.propTypes = {
  toogleSwitch: PropTypes.func,
  switchValue: PropTypes.bool
};

ToogleComponent.defaultProps = {
  toogleSwitch: () => {},
  switchValue: true
};

export default ToogleComponent;
