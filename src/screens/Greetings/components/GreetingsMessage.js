import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import MenuItem from './MenuItem';
import UserAvatar from './Avatar';
import styles from './styles';
import options from '../../../constants/initialMessage';

export default class GreetingsMessage extends Component {
  state = { text: {} };

  renderAvatar = props => <UserAvatar {...props} />;

  componentDidMount = async () => {
    // eslint-disable-next-line max-len
    const message = `Welcome to the Converge Companion App. What would you like to do?`;
    const token = await AsyncStorage.getItem('token');
    const decoded = await jwtDecode(token);
    const {
      UserInfo: { firstName }
    } = decoded;

    const text = {
      title: `Hi ${firstName}, ${message}`
    };

    this.setState({ text });
  };

  render() {
    const {
      text: { title }
    } = this.state;
    const { onPress } = this.props;
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
                <MenuItem {...option} onPress={onPress} />
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
    text: PropTypes.string
  }),
  onPress: PropTypes.func.isRequired
};

GreetingsMessage.defaultProps = {
  currentMessage: {}
};
