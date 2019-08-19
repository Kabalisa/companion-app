import { StyleSheet, Dimensions, Platform } from 'react-native';
import { scale } from 'react-native-size-matters';

import responsiveStyles from '../../../shared/styles/responsiveStyles';

const { width } = Dimensions.get('window');

const container = {
  alignItems: 'center',
  justifyContent: 'center'
};
const textStyles = {
  fontSize: responsiveStyles().responsiveTextStylesFontSize,
  lineHeight: responsiveStyles().responsiveTextStylesLineHeight,
  fontWeight: Platform.OS === 'ios' ? '500' : '400',
  fontFamily: 'DINPro'
};

const shadowStyles = {
  shadowColor: 'rgba(0,0,0,0.7)',
  shadowOffset: {
    width: 0,
    height: 1
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,

  elevation: 2
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  menuItem: {
    ...container,
    ...shadowStyles,
    borderRadius: responsiveStyles().responsiveMenuItemBorderRadius,
    padding: scale(10),
    marginBottom: scale(10),
    marginRight: scale(20),
    height: undefined,
    aspectRatio: responsiveStyles().responsiveMenuItemAspectRatio,
    width: responsiveStyles().responsiveMenuItemWidth
  },
  menuItemImage: {
    display: responsiveStyles().responsivemenuItemImageDisplay,
    marginBottom: responsiveStyles().responsiveMenuItemImageMarginBottom,
    height: undefined,
    aspectRatio: 1 / 1,
    width: responsiveStyles().responsiveMenuItemImageWidth
  },
  menuItemText: {
    textAlign: 'center',
    maxWidth: scale(85),
    minWidth: scale(65),
    ...textStyles
  },
  greetingsTitle: {
    backgroundColor: 'rgba(236,241,250,1)',
    padding: responsiveStyles().responsiveMessagePadding,
    maxWidth: scale(227),
    ...container,
    marginBottom: responsiveStyles().responsiveGreetingsTitleMarginBottom,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14
  },
  userMessage: {
    ...container,
    backgroundColor: 'rgba(4,89,228,1);',
    color: 'white',
    padding: responsiveStyles().responsiveMessagePadding,
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
    fontSize: 20,
    lineHeight: 20
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: Math.floor((width * 5) / 6)
  },
  navigationProfileAvatar: {
    width: width >= 768 ? scale(25) : scale(35),
    marginLeft: scale(20),
    marginRight: scale(20),
    marginBottom: scale(5),

    height: undefined,
    aspectRatio: 1 / 1,
    borderRadius: width >= 768 ? scale(25 / 2) : scale(35 / 2)
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
  messageContainer: {
    marginBottom: 40,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  systemMessageContainer: { alignSelf: 'flex-start', flexDirection: 'row' },
  userMessageContainer: { alignSelf: 'flex-end', flexDirection: 'row' },
  wrapper: {
    marginBottom: 27,
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  message: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(20),
    maxWidth: scale(227),
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    marginBottom: scale(8)
  },
  messageText: { ...textStyles },
  timeStampContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  timeStampText: {
    fontSize: 12,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginRight: 8,
    color: 'rgba(153,165,172,1)'
  },
  checkMark: {
    marginLeft: 3,
    alignSelf: 'center',
    marginTop: -5
  },
  messageAvatar: {
    marginLeft: '3%'
  },
  greetingsContainer: { flexDirection: 'row', marginRight: 30, paddingTop: 40 },
  suggestionContainer: {
    marginBottom: scale(20)
  },
  suggestionContent: {
    padding: responsiveStyles().responsiveMessagePadding,
    ...container,
    borderWidth: 1,
    borderColor: '#0459E4',
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
  },
  modalStyles: {
    justifyContent: 'flex-start',
    height: Platform.OS === 'ios' ? '65%' : '55%',
    paddingVertical: 15,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowColor: 'rgba(0,0,0,0.03)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5
  },
  modal: {
    margin: 0
  },
  backDrop: {
    flex: 0.5
  },
  contentContainer: {
    flex: 0.5,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width
  },
  content: {
    backgroundColor: '#fff',
    width: '100%',
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    height: '100%',
    shadowColor: 'rgba(0,0,0,0.03)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5
  },
  messageDetails: {
    alignSelf: 'flex-start',
    marginLeft: 54,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default styles;
