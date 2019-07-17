import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import BackButton from '../../../shared/components/Buttons/BackButton';
import CalendarButton from '../../../shared/components/Buttons/CalendarButton';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: scale(50)
  }
});
const Header = ({ goBack, onToggle, closeIcon }) => (
  <View style={styles.container}>
    <BackButton onPress={goBack} />
    <CalendarButton onPress={onToggle} closeIcon={closeIcon} />
  </View>
);

Header.propTypes = {
  goBack: PropTypes.func.isRequired,
  closeIcon: PropTypes.bool,
  onToggle: PropTypes.func.isRequired
};
Header.defaultProps = {
  closeIcon: true
};
export default Header;
