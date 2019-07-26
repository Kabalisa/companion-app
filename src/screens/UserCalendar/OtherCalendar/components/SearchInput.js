import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { addCalendarStyles } from '../../components/styles';

const SearchInput = ({ onTextChange, value }) => (
  <KeyboardAvoidingView behavior="padding">
    <View style={addCalendarStyles.searchBoxContainer}>
      <TextInput
        style={addCalendarStyles.searchInput}
        placeholder="Search for attendees…"
        onChangeText={textValue => onTextChange(textValue)}
        value={value}
        autoCapitalize="none"
        testID="text-input"
      />
      <Ionicons name="ios-search" size={28} color="#2086CA" />
    </View>
  </KeyboardAvoidingView>
);

SearchInput.propTypes = {
  onTextChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};
export default SearchInput;
