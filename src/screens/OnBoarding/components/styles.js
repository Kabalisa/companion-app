import { Dimensions, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default StyleSheet.create({
  header: {
    height: scale(226),
    width: scale(291),
    marginTop: '30%'
  },
  body: {
    flex: 0.3,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  alignBody: {
    alignContent: 'center',
    justifyContent: 'center'
  },
  title: {
    alignSelf: 'center',
    fontSize: 22,
    color: 'rgba(52,76,90,1)',
    opacity: 1.0,
    marginTop: scale(35),
    marginBottom: scale(20),
    fontFamily: 'DINPro'
  },
  bodyText: {
    fontSize: 14,
    textAlign: 'center',
    color: 'rgba(52,76,90,1)',
    opacity: 0.8,
    marginBottom: scale(5),
    fontFamily: 'DINPro'
  },
  boldText: {
    fontSize: 14,
    textAlign: 'center',
    color: 'rgba(52,76,90,1)',
    marginBottom: scale(30),
    fontFamily: 'DINPro'
  },
  buttomText: {
    color: 'rgba(52,76,90,0.34)',
    fontSize: 14,
    opacity: 1.0,
    fontFamily: 'DINPro'
  },
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
    width: SCREEN_WIDTH * 0.8,
    backgroundColor: 'rgba(255,255,255,1)',
    paddingBottom: scale(20)
  },
  containerFlex: {
    flex: 0.6
  },
  pagination: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%'
  },
  currentPage: {
    height: 10,
    width: 38,
    borderColor: 'rgba(4,90,228,1)',
    borderRadius: 5,
    margin: 2,
    backgroundColor: 'rgba(4, 90, 228, 1)'
  },
  pages: {
    height: 10,
    width: 10,
    borderColor: 'rgba(120, 163, 234, 1)',
    borderWidth: 1,
    borderRadius: 50,
    margin: 2
  }
});
