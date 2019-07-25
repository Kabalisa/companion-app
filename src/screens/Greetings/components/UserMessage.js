import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';
import UserAvatar from './Avatar';
import styles from './styles';

export default class UserMessage extends Component {
  renderAvatar = props => <UserAvatar {...props} />;

  render() {
    const {
      currentMessage: { text, createdAt }
    } = this.props;

    return (
      <View style={[styles.messageContainer]}>
        <View style={styles.userMessageContainer}>
          <View style={styles.userMessage}>
            <Text style={styles.userMessageTitle}>{text}</Text>
          </View>
          <View style={styles.messageAvatar}>
            {this.renderAvatar(this.props)}
          </View>
        </View>
        <View style={styles.timeStampContainer}>
          <View>
            <Text style={{ fontSize: 10, color: 'rgba(153,165,172,1)' }}>
              {`Sent ${moment(createdAt).fromNow()}`}
            </Text>
          </View>
          <View style={styles.checkMark}>
            <Ionicons
              name="ios-checkmark"
              size={23}
              color="rgba(153,165,172,1)"
            />
          </View>
        </View>
      </View>
    );
  }
}

UserMessage.propTypes = {
  currentMessage: PropTypes.shape({
    text: PropTypes.string,
    createdAt: PropTypes.any
  }).isRequired
};
