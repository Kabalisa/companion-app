import React, { Component } from 'react';
import { Platform, SafeAreaView, AsyncStorage } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { GiftedChat } from 'react-native-gifted-chat';
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
        UserInfo: { picture }
      } = decoded;
      setParams({ picture });
    });
  }

  _onSend(message) {
    const { sendMessages } = this.props;
    sendMessages(message);
  }

  renderInputToolbar = props => <InputToolbar {...props} />;

  renderSend = props => <Send {...props} />;

  renderMessage = props => <Message {...props} />;

  render() {
    const { messages } = this.props;
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
            name: 'Ebun',
            avatar: 'https://placeimg.com/140/140/any'
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
