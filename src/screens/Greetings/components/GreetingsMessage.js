import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';
import UserAvatar from './Avatar';
import styles from './styles';

export default class GreetingsMessage extends Component {
  renderAvatar = props => <UserAvatar {...props} />;

  render() {
    const {
      currentMessage: {
        text: { title, options }
      }
    } = this.props;

    return (
      <View style={styles.greetingsContainer}>
        <View style={{ marginLeft: '5%' }}>
          {this.renderAvatar(this.props)}
        </View>
        <View>
          <View style={styles.greetingsTitle}>
            <Text style={styles.greetingsTitleText}>{title}</Text>
          </View>

          <View style={styles.menuContainer}>
            {options.map(option => (
              <View key={`${option.itemDescription}`}>
                <MenuItem {...option} />
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  }
}

GreetingsMessage.propTypes = {
  currentMessage: PropTypes.shape({
    text: PropTypes.shape({
      title: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.shape({}))
    })
  })
};

GreetingsMessage.defaultProps = {
  currentMessage: {}
};
