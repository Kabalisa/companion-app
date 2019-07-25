import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';
import UserAvatar from './Avatar';
import styles from './styles';

export default class SystemMessage extends Component {
  renderAvatar = props => <UserAvatar {...props} />;

  render() {
    const {
      currentMessage: { text, createdAt }
    } = this.props;
    return (
      <View
        style={[
          styles.messageContainer,
          {
            marginBottom: 40,
            paddingVertical: 10,
            justifyContent: 'space-between',
            alignItems: 'center'
          }
        ]}
      >
        <View style={styles.systemMessageContainer}>
          <View style={styles.messageAvatar}>
            {this.renderAvatar(this.props)}
          </View>
          <View style={styles.greetingsTitle}>
            <Text style={styles.greetingsTitleText}>{text}</Text>
          </View>
        </View>
        <View
          style={{
            alignSelf: 'flex-start',
            marginLeft: 54,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <View>
            <Text style={{ fontSize: 10, color: 'rgba(153,165,172,1)' }}>
              {`Sent ${moment(createdAt).fromNow()}`}
            </Text>
          </View>
          <View
            style={{
              marginLeft: 3,
              alignSelf: 'center',
              marginTop: -5
            }}
          >
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

SystemMessage.propTypes = {
  currentMessage: PropTypes.shape({
    text: PropTypes.string,
    createdAt: PropTypes.any
  }).isRequired
};
