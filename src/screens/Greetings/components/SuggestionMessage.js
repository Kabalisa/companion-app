import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

export default class SuggestionMessage extends React.Component {
  state = {
    isAccepted: false
  };

  onPress = () => {
    this.setState({
      isAccepted: true
    });
  };

  renderIcon = (icon, primaryColor) => (
    <Ionicons
      name={icon}
      size={28}
      color={primaryColor}
      style={styles.suggestionIcon}
    />
  );

  render() {
    const { isAccepted } = this.state;
    const { text, icon } = this.props;

    const primaryColor = isAccepted ? '#ffffff' : '#10a36d';
    const backgroundColor = isAccepted ? '#10a36d' : '#ecfaee';

    return (
      <View style={[styles.systemMessageContainer, styles.suggestionContainer]}>
        <View style={styles.suggestionHr}>
          <View style={styles.suggestionHrLine} />
        </View>
        <TouchableOpacity
          onPress={this.onPress}
          style={[styles.suggestionContent, { backgroundColor }]}
          disabled={!!isAccepted}
        >
          {this.renderIcon(icon, primaryColor)}
          <Text style={[styles.suggestionText, { color: primaryColor }]}>
            {text}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

SuggestionMessage.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};
