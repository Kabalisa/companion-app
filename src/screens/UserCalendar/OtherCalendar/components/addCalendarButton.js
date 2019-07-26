import React from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import PropTypes from 'prop-types';
import AddEventsIcon from '../../../../assets/search.png';
import { addEventStyles } from '../../components/styles';

const AddCalendarButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={addEventStyles.addEventsButton}>
      <Image source={AddEventsIcon} style={addEventStyles.addEventsIcon} />
    </View>
  </TouchableOpacity>
);

AddCalendarButton.propTypes = {
  onPress: PropTypes.func.isRequired
};

export default AddCalendarButton;
