import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import UserAvatar from './Avatar';
import MenuOptions from './MenuOptions';
import ViewText from './ViewText';
import styles from './styles';

export default class GreetingsMessage extends Component {
  state = { text: { title: '' } };

  renderAvatar = props => <UserAvatar {...props} />;

  componentDidMount = async () => {
    const message = 'Welcome to the Converge Companion'
    + 'App. What would you like to do?';
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
        <View style={{ marginLeft: '5%' }}>{this.renderAvatar(this.props)}</View>
        <View>
          <ViewText
            viewStyles={styles.greetingsTitle}
            textStyles={styles.greetingsTitleText}
            text={title}
          />
          <MenuOptions onPress={onPress} />
        </View>
      </View>
    );
  }
}

GreetingsMessage.propTypes = {
  currentMessage: PropTypes.shape({
    text: PropTypes.any
  }),
  onPress: PropTypes.func
};

GreetingsMessage.defaultProps = {
  currentMessage: {
    text: ''
  },
  onPress: () => {}
};
