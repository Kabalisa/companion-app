import { StyleSheet, Dimensions } from 'react-native';
import { scale } from 'react-native-size-matters';
import color from 'color';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  header: {
    flex: 0.3,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  content: {
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: scale(20)
  },
  appLogoContainer: {
    backgroundColor: '#0459E4',
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    borderWidth: 0
  },
  appLogo: {
    height: 50,
    width: 50,
    tintColor: '#fff'
  },
  titleContainer: {
    alignItems: 'center'
  },
  title: {
    fontSize: scale(24),
    lineHeight: scale(31),
    color: '#344C5A',
    letterSpacing: 1
  },
  subTitle: {
    color: '#344C5A',
    fontSize: scale(12),
    lineHeight: scale(15),
    letterSpacing: 0
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: scale(54),
    borderRadius: scale(8),
    width: SCREEN_WIDTH * 0.8,
    borderColor: color('#344C5A')
      .alpha(0.2)
      .lighten(0.8),
    borderWidth: StyleSheet.hairlineWidth,
    shadowColor: color('#344C5A').alpha(0.3),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 6,
    elevation: 5,
    backgroundColor: '#fff'
  },
  btnTitle: {
    fontSize: scale(16),
    lineHeight: scale(40),
    color: '#344C5A'
  },
  gIcon: {
    height: scale(18),
    width: scale(18),
    marginRight: 15
  },
  andelaLogo: {
    height: scale(32)
  }
});
