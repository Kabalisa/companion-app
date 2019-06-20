import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import UserAvatar from './Avatar';
import styles from './styles';

export default class SystemMessage extends Component {
  renderAvatar = props => <UserAvatar {...props} />;

  render() {
    const {
      currentMessage: { text }
    } = this.props;
    return (
      <View style={styles.messageContainer}>
        <View style={styles.systemMessageContainer}>
          <View style={styles.messageAvatar}>
            {this.renderAvatar(this.props)}
          </View>
          <View style={styles.greetingsTitle}>
            <Text style={styles.greetingsTitleText}>{text}</Text>
          </View>
        </View>
      </View>
    );
  }
}

SystemMessage.propTypes = {
  currentMessage: PropTypes.shape({ text: PropTypes.string }).isRequired
};
