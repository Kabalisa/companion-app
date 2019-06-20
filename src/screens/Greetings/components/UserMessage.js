import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import UserAvatar from './Avatar';
import styles from './styles';

export default class UserMessage extends Component {
  renderAvatar = props => <UserAvatar {...props} />;

  render() {
    const {
      currentMessage: { text }
    } = this.props;
    return (
      <View style={styles.messageContainer}>
        <View style={styles.userMessageContainer}>
          <View style={styles.userMessage}>
            <Text style={styles.userMessageTitle}>{text}</Text>
          </View>
          <View style={styles.messageAvatar}>
            {this.renderAvatar(this.props)}
          </View>
        </View>
      </View>
    );
  }
}

UserMessage.propTypes = {
  currentMessage: PropTypes.shape({ text: PropTypes.string }).isRequired
};
