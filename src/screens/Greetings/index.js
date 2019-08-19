import React, { Component } from 'react';
import {
  Platform,
  SafeAreaView,
  Alert,
  AsyncStorage,
  Dimensions,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { Constants } from 'expo';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { GiftedChat } from 'react-native-gifted-chat';
import { Dialogflow_V2 as DialogFlow } from 'react-native-dialogflow-text';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
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
import PinnedUser from '../UserCalendar/OtherCalendar/components/PinnedUser';
import SearchResults from
  '../UserCalendar/OtherCalendar/components/SearchResults';
import SearchInput from '../UserCalendar/OtherCalendar/components/SearchInput';
import SaveAttendeeButton from
  './InviteAttendees/components/SaveAttendeeButton';
import {
  pinAttendeesAction,
  unpinAttendeeAction
} from '../../store/attendees/action';
import { getUserEmail as getAttendeeEmail } from '../../utils/helpers';

const { width: DEVICE_WIDTH } = Dimensions.get('window');
const { CLIENT_EMAIL, PRIVATE_KEY, PROJECT_ID } = config;
const BOT_USER = { _id: 2, name: 'SmartBot', avatar: companionAppLogo };

const { width } = Dimensions.get('window');

export class GreetingsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerStyle:
        width >= 768
          ? {
            marginTop: Constants.statusBarHeight,
            paddingBottom: 10
          }
          : {},
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

  listViewProps = {
    contentInset: { bottom: 40 },
    style: {
      padding: 20,
      paddingLeft: 0
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      email: null,
      data: [],
      text: '',
      isModalVisible: false
    };
    this.getAttendeeEmail = getAttendeeEmail.bind(this);
  }

  componentDidMount() {
    const { navigation: { setParams } = {} } = this.props;
    AsyncStorage.getItem('token').then((token) => {
      const decoded = jwtDecode(token);
      const {
        UserInfo: { picture, email, firstName }
      } = decoded;
      setParams({ picture });
      this.setState({ userAvatar: picture, email, firstName });
      DialogFlow.setConfiguration(
        CLIENT_EMAIL,
        PRIVATE_KEY,
        DialogFlow.LANG_ENGLISH_US,
        PROJECT_ID
      );
    });
  }

  sendBotResponse = (text, messageProps = {}) => {
    const { sendMessages, messages } = this.props;
    const message = {
      _id: messages.length + 1,
      text,
      createdAt: new Date(),
      user: BOT_USER,
      messageProps
    };
    sendMessages(message);
  };

  handleGoogleResponse = (result) => {
    if (result.error) {
      const { code, status, message } = result.error;
      return Alert.alert(
        `${status} ${code}`,
        message,
        [{ text: 'CANCEL' }, { text: 'OK' }],
        { cancelable: false }
      );
    }

    const {
      queryResult: {
        fulfillmentText: message,
        intent: { name: intentName = '' }
      }
    } = result;
    if (message.toLowerCase().includes('email')) {
      return this.sendUserEmail();
    }
    if (
      intentName.includes('intents/5279baf4-d47d-47c1-baf5-b1e3e1f77f25')
    ) {
      return this.sendBotResponse(message, { showMenu: true });
    }
    return this.sendBotResponse(message);
  };

  sendUserEmail = async () => {
    const { email } = this.state;
    const wasShown = await AsyncStorage.getItem('isPermitted');
    if (wasShown) this._onSend({ text: email }, false);
    else {
      Alert.alert(
        'CALENDAR PERMISSION',
        `Allow Companion to have access to your ${email} calendar`,
        [
          { text: 'CANCEL' },
          { text: 'OK', onPress: () => this._onSend({ text: email }, false) }
        ],
        { cancelable: false }
      );
      await AsyncStorage.setItem('isPermitted', 'true');
    }
  };

  openAddAttendeesModal = () => {
    this.setState(state => ({
      isModalVisible: !state.isModalVisible
    }));
  };

  pinSelectedAttendee = (item) => {
    const { email, id } = item;
    const { pinnedAttendees, pinAttendees } = this.props;
    const userExist = pinnedAttendees.find(user => user.userId === id);
    if (!userExist) {
      const users = [...pinnedAttendees.map(user => user.email), email];
      pinAttendees(item, users);
      this.getAttendeeEmail('');
    }
  };

  _onSend = (message, printMessage = true) => {
    const { sendMessages } = this.props;
    if (printMessage) sendMessages(message);
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

  renderSearchBox = () => {
    const { text } = this.state;
    return <SearchInput onTextChange={this.getAttendeeEmail} value={text} />;
  };

  renderResult = () => {
    const { data } = this.state;
    return <SearchResults data={data} pinUser={this.pinSelectedAttendee} />;
  };

  renderPinnedAttendee = () => {
    const { pinnedAttendees, unpinAttendee } = this.props;
    return (
      <PinnedUser
        pinnedUsers={pinnedAttendees}
        removeUser={unpinAttendee}
      />
    );
  };

  renderSaveButton = () => (<SaveAttendeeButton />)

  renderMessage = (props) => {
    const { messages } = this.props;
    const { userAvatar, firstName } = this.state;

    return (
      <Message
        {...props}
        {...messages[0].messageProps}
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
        action={{
          openAttendeesModal: this.openAddAttendeesModal
        }}
      />
    );
  };

  render() {
    const { messages } = this.props;
    const {
      userAvatar,
      firstName,
      data,
      isModalVisible
    } = this.state;

    return (
      <SafeAreaView behavior="padding" enabled style={[styles.container]}>
        <GiftedChat
          testID="GiftedChat"
          messages={messages}
          onSend={message => this._onSend(message[0])}
          renderMessage={this.renderMessage}
          renderInputToolbar={this.renderInputToolbar}
          renderSend={this.renderSend}
          listViewProps={this.listViewProps}
          renderSuggestionMessage={this.renderSuggestionMessage}
          user={{
            _id: 1,
            name: firstName,
            avatar: userAvatar
          }}
          alignTop
        />

        <Modal
          avoidKeyboard
          backdropOpacity={0.1}
          isVisible={isModalVisible}
          deviceWidth={DEVICE_WIDTH}
          style={styles.modal}
          hasBackdrop
        >
          <View style={styles.container}>
            <TouchableWithoutFeedback onPress={this.openAddAttendeesModal}>
              <View style={styles.backDrop} />
            </TouchableWithoutFeedback>
            <View style={styles.contentContainer}>
              <View style={styles.content}>
                {this.renderSearchBox()}
                {data.length > 0 ? this.renderResult() : null}
                {this.renderPinnedAttendee()}
                {this.renderSaveButton()}
              </View>
            </View>
          </View>
        </Modal>
        {Platform.OS === 'ios' ? null : <KeyboardSpacer />}
      </SafeAreaView>
    );
  }
}

GreetingsScreen.propTypes = {
  navigation: PropTypes.shape({
    setParams: PropTypes.func
  }),
  pinnedAttendees: PropTypes.arrayOf(PropTypes.shape({})),
  unpinAttendee: PropTypes.func,
  pinAttendees: PropTypes.func,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      messageProps: PropTypes.shape({})
    })
  ),
  sendMessages: PropTypes.func
};

GreetingsScreen.defaultProps = {
  navigation: {
    setParams: () => {}
  },
  messages: [{}],
  unpinAttendee: () => {},
  pinAttendees: () => {},
  sendMessages: () => {},
  pinnedAttendees: [{}]
};
export const mapStateToProps = state => ({
  messages: state.messages.messages,
  ...state.attendees
});

export const mapDispatchToProps = dispatch => ({
  sendMessages: message => dispatch(sendMessage(message)),
  pinAttendees: item => dispatch(pinAttendeesAction(item)),
  unpinAttendee: item => dispatch(unpinAttendeeAction(item.email))
});

export const ConnectedGreetingsScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(GreetingsScreen);
