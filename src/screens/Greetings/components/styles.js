import { StyleSheet, Dimensions } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';

const { width } = Dimensions.get('window');

const container = {
  alignItems: 'center',
  justifyContent: 'center'
};
const textStyles = {
  fontSize: 12,
  lineHeight: 15,
  fontWeight: '500',
  fontFamily: 'DINPro'
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  menuItem: {
    ...container,
    borderRadius: 19,
    padding: scale(10),
    marginBottom: scale(10),
    marginRight: scale(20),
    height: undefined,
    aspectRatio: 123 / 148,
    width: scale(123)
  },
  menuItemImage: {
    marginBottom: scale(20),
    height: undefined,
    aspectRatio: 1 / 1,
    width: verticalScale(54)
  },
  menuItemText: {
    textAlign: 'center',
    maxWidth: scale(85),
    minWidth: scale(65),
    ...textStyles
  },
  greetingsTitle: {
    backgroundColor: 'rgba(236,241,250,1)',
    padding: scale(20),
    maxWidth: scale(227),
    ...container,
    marginBottom: scale(20),
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14
  },
  userMessage: {
    ...container,
    backgroundColor: 'rgba(4,89,228,1);',
    color: 'white',
    padding: scale(20),
    maxWidth: scale(227),
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderBottomLeftRadius: 14,
    justifyContent: 'flex-end',
    marginBottom: scale(20)
  },
  userMessageTitle: {
    color: 'rgba(255,255,255,1)',
    ...textStyles
  },
  greetingsTitleText: {
    color: ' rgba(52,76,90,1)',
    ...textStyles,
    fontWeight: '300'
  },
  inputPrimary: {
    margin: scale(10),
    borderColor: 'green'
  },
  inputToolBar: {
    borderRadius: scale(30),
    borderColor: '#F3F4F5',
    borderTopColor: '#F3F4F5',
    borderBottomWidth: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderWidth: StyleSheet.hairlineWidth * 2,
    width: '100%',
    shadowRadius: 1,
    shadowOffset: {
      width: 0,
      height: -1
    },
    shadowColor: '#000000',
    elevation: 4,
    shadowOpacity: 0.05
  },
  inputBoxText: {
    fontSize: 20
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: Math.floor((width * 5) / 6)
  },
  navigationProfileAvatar: {
    width: scale(35),
    marginLeft: scale(20),
    marginRight: scale(20),
    marginBottom: scale(5),

    height: undefined,
    aspectRatio: 1 / 1,
    borderRadius: scale(35 / 2)
  },
  sendIcon: {
    height: scale(25),
    width: scale(25),
    marginLeft: scale(10),
    marginRight: scale(10)
  },
  conversationAvatar: {
    height: scale(46),
    width: scale(46),
    borderRadius: scale(46 / 2)
  },
  sendIconContainer: {
    alignSelf: 'center',
    justifyContent: 'center'
  },
  systemMessageContainer: { alignSelf: 'flex-start', flexDirection: 'row' },
  userMessageContainer: { alignSelf: 'flex-end', flexDirection: 'row' },
  messageContainer: {
    flexDirection: 'column',
    marginRight: 0,
    marginBottom: 40,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  timeStampContainer: {
    alignSelf: 'flex-end',
    marginRight: 52,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  checkMark: {
    marginLeft: 3,
    alignSelf: 'center',
    marginTop: -5
  },
  messageAvatar: {
    marginLeft: '3%',
    justifyContent: 'center'
  },
  greetingsContainer: { flexDirection: 'row', marginRight: 30 },
  suggestionContainer: {
    marginBottom: scale(20)
  },
  suggestionContent: {
    padding: scale(20),
    ...container,
    borderWidth: 1,
    borderColor: '#10a36d',
    backgroundColor: '#ecfaee',
    flexDirection: 'row',
    borderRadius: 19,
    maxWidth: scale(227),
    paddingVertical: scale(10),
    marginRight: scale(20)
  },
  suggestionText: {
    ...textStyles,
    fontWeight: '500'
  },
  suggestionHr: {
    justifyContent: 'center',
    flex: 1
  },
  suggestionHrLine: {
    backgroundColor: '#ecf1fa',
    height: 1,
    marginLeft: 11,
    marginRight: 7
  },
  suggestionIcon: {
    marginRight: 15
  }
});

export default styles;
