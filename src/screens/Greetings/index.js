import React, { Component } from 'react';
import {
  Platform,
  SafeAreaView,
  AsyncStorage
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { GiftedChat } from 'react-native-gifted-chat';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
import initialMessage from './utils/initialMessage';
import companionAppLogo from './components/icons/companion-logo.png';
import Send from './components/Send';
import InputToolbar from './components/InputToolBar';
import Message from './components/Message';
import HeaderLeft from './components/HeaderLeft';
import HeaderRight from './components/HeaderRight';
import styles from './components/styles';

export default class GreetingsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerRight: <HeaderRight />,
      headerLeft: (
        <HeaderLeft
          onPress={navigation.toggleDrawer}
          profileAvatar={params.picture}
        />
      )
    };
  };

  state = {
    messages: [
      {
        _id: 1,
        text: initialMessage('Ebun'),
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Companion App',
          avatar: companionAppLogo
        }
      }
    ]
  };

  componentDidMount() {
    const { navigation: { setParams } } = this.props;
    AsyncStorage.getItem('token').then((token) => {
      const decoded = jwtDecode(token);
      const {
        UserInfo: { picture }
      } = decoded;
      setParams({ picture });
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }

  renderInputToolbar = props => <InputToolbar {...props} />;

  renderSend = props => <Send {...props} />;

  renderMessage = props => <Message {...props} />;

  render() {
    const { messages } = this.state;
    return (
      <SafeAreaView style={[styles.container]}>
        <GiftedChat
          testID="GiftedChat"
          messages={messages}
          onSend={message => this.onSend(message)}
          renderMessage={this.renderMessage}
          renderInputToolbar={this.renderInputToolbar}
          renderSend={this.renderSend}
          user={{
            _id: 1,
            name: 'Ebun',
            avatar: 'https://placeimg.com/140/140/any'
          }}
        />
        {Platform.OS === 'ios' ? null : <KeyboardSpacer />}
      </SafeAreaView>
    );
  }
}

GreetingsScreen.propTypes = {
  navigation: PropTypes.shape({
    setParams: PropTypes.func
  })
};

GreetingsScreen.defaultProps = {
  navigation: {
    setParams: () => {}
  }
};
