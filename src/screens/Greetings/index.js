import React, { Component } from 'react';
import {
  Platform, SafeAreaView, Alert, AsyncStorage
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { GiftedChat } from 'react-native-gifted-chat';
import { Dialogflow_V2 as DialogFlow } from 'react-native-dialogflow-text';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendMessage } from '../../store/messages/actions';
import Send from './components/Send';
import InputToolbar from './components/InputToolBar';
import Message from './components/Message';
import HeaderLeft from './components/HeaderLeft';
import HeaderRight from './components/HeaderRight';
import styles from './components/styles';
import config from '../../../config';
import companionAppLogo from './components/icons/companion-logo.png';

const { CLIENT_EMAIL, PRIVATE_KEY, PROJECT_ID } = config;
const BOT_USER = { _id: 2, name: 'SmartBot', avatar: companionAppLogo };

export class GreetingsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerRight: (
        <HeaderRight onPress={() => navigation.navigate('UserCalendar')} />
      ),
      headerLeft: (
        <HeaderLeft
          onPress={navigation.toggleDrawer}
          profileAvatar={params.picture}
        />
      )
    };
  };

  state = {};

  listViewProps = {
    contentInset: { bottom: 40 },
    style: {
      padding: 20,
      paddingLeft: 0
    }
  };

  componentDidMount() {
    const {
      navigation: { setParams }
    } = this.props;
    AsyncStorage.getItem('token').then((token) => {
      const decoded = jwtDecode(token);
      const {
        UserInfo: { picture, email, firstName }
      } = decoded;
      setParams({ picture });
      this.setState({ userAvatar: picture, firstName });
      DialogFlow.setConfiguration(
        CLIENT_EMAIL,
        PRIVATE_KEY,
        DialogFlow.LANG_ENGLISH_US,
        PROJECT_ID
      );
      DialogFlow.requestQuery(
        email,
        () => Alert.alert('CompanionApp has access to your calendar'),
        () => this.sendBotResponse('What was that?')
      );
    });
  }

  sendBotResponse = (text) => {
    const { sendMessages, messages } = this.props;

    const message = {
      _id: messages.length + 1,
      text,
      createdAt: new Date(),
      user: BOT_USER
    };

    sendMessages(message);
  };

  handleGoogleResponse = (result) => {
    if (!result.error) {
      const { fulfillmentMessages } = result.queryResult;
      const [firstFulfillment] = fulfillmentMessages;
      const { text = {} } = firstFulfillment;
      const { text: messages = [] } = text;
      const [message = ''] = messages;
      this.sendBotResponse(message);
    } else {
      const { code, status, message } = result.error;

      Alert.alert(
        `${status} ${code}`,
        message,
        [{ text: 'CANCEL' }, { text: 'OK' }],
        {
          cancelable: false
        }
      );
    }
  };

  _onSend(message) {
    const { sendMessages } = this.props;
    sendMessages(message);
    const { text = '' } = message;
    DialogFlow.requestQuery(
      text,
      result => this.handleGoogleResponse(result),
      (error) => {
        throw Error(JSON.stringify(error));
      }
    );
  }

  renderInputToolbar = props => <InputToolbar {...props} />;

  renderSend = props => <Send {...props} />;

  renderMessage = (props) => {
    const { messages } = this.props;
    const { userAvatar, firstName } = this.state;
    return (
      <Message
        {...props}
        onPress={text => this._onSend({
          _id: messages.length + 1,
          text,
          createdAt: new Date(),
          user: {
            _id: 1,
            name: firstName,
            avatar: userAvatar
          }
        })
        }
      />
    );
  };

  render() {
    const { messages } = this.props;
    const { userAvatar, firstName } = this.state;

    return (
      <SafeAreaView style={[styles.container]}>
        <GiftedChat
          testID="GiftedChat"
          messages={messages}
          onSend={message => this._onSend(message[0])}
          renderMessage={this.renderMessage}
          renderInputToolbar={this.renderInputToolbar}
          renderSend={this.renderSend}
          listViewProps={this.listViewProps}
          user={{
            _id: 1,
            name: firstName,
            avatar: userAvatar
          }}
          alignTop
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

GreetingsScreen.propTypes = {
  navigation: PropTypes.shape({
    setParams: PropTypes.func
  }),
  messages: PropTypes.arrayOf(PropTypes.shape({})),
  sendMessages: PropTypes.func.isRequired
};

GreetingsScreen.defaultProps = {
  navigation: {
    setParams: () => {}
  },
  messages: [{}]
};
const mapStateToProps = state => ({
  messages: state.messages.messages
});

const mapDispatchToProps = dispatch => ({
  sendMessages: message => dispatch(sendMessage(message))
});

export const ConnectedGreetingsScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(GreetingsScreen);
