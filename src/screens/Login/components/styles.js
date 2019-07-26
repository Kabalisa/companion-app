import { StyleSheet, Dimensions } from 'react-native';
import { scale } from 'react-native-size-matters';
import color from 'color';

const SCREEN_WIDTH = Dimensions.get('window').width;
export default StyleSheet.create({
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
    color: '#344C5A',
    fontFamily: 'DINPro'
  },
  gIcon: {
    height: undefined,
    width: scale(20),
    aspectRatio: 135 / 76,
    marginRight: scale(5)
  },
  loadingStyles: {
    position: 'absolute'
  },
  toastStyles: {
    backgroundColor: 'red',
    width: '100%',
    borderRadius: 0,
    alignItems: 'center'
  }
});
