import {
  StyleSheet, Dimensions, StatusBar, Platform
} from 'react-native';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import color from 'color';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 0 : StatusBar.currentHeight;
const { width, height } = Dimensions.get('window');
const DEVICE_WIDTH = width;
const DEVICE_HEIGHT = height;
export const calendarStyles = StyleSheet.create({
  section: {
    backgroundColor: '#fff',
    color: '#ccc',
    height: 0,
    width: 0
  }
});
export const agendaList = StyleSheet.create({
  horizontalLine: {
    borderColor: '#ccc',
    borderWidth: StyleSheet.hairlineWidth,
    width: DEVICE_WIDTH * 0.8,
    height: StyleSheet.hairlineWidth
  },
  main: {
    position: 'absolute',
    width: DEVICE_WIDTH * 0.8,
    right: 0
  },
  header: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    height: scale(50)
  },
  title: {
    paddingLeft: scale(15)
  }
});
export const agendaItem = StyleSheet.create({
  container: {
    right: 0,
    width: DEVICE_WIDTH * 0.8,
    borderRadius: scale(10),
    paddingVertical: scale(5),
    paddingHorizontal: scale(5),
    zIndex: 100,
    borderColor: '#fff',
    borderWidth: StyleSheet.hairlineWidth * 2
  }
});

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginTop: STATUSBAR_HEIGHT,
    height: DEVICE_HEIGHT || 0
  }
});

export const currentTimeStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    alignSelf: 'flex-end',
    top: verticalScale(20)
  },
  oval: {
    width: moderateScale(10),
    height: moderateScale(10),
    borderRadius: 5,
    backgroundColor: '#4D6EFF'
  },
  bar: {
    width: DEVICE_WIDTH * 0.8,
    borderColor: '#4D6EFF',
    borderBottomWidth: StyleSheet.hairlineWidth * 10,
    top: moderateScale(3),
    height: 0
  }
});

export const headerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  rightContent: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: scale(10),
    marginHorizontal: scale(20)
  },
  avatarContainer: {
    position: 'relative',
    flexDirection: 'row'
  },
  avatartItem: {
    marginLeft: -10
  }
});

export const addEventStyles = StyleSheet.create({
  addEventsButton: {
    width: scale(28),
    height: scale(28),
    borderRadius: scale(28 / 2),
    backgroundColor: '#0459E4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(3),
    marginRight: scale(5)
  },
  addEventsIcon: {
    width: scale(15),
    height: undefined,
    aspectRatio: 1 / 1
  }
});

export const addCalendarStyles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  Header: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  list: {
    borderBottomWidth: 1,
    borderColor: '#E9F1F4',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    alignSelf: 'center',
    shadowColor: '#E9F1F4',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 9,
    elevation: 5,
    padding: 4
  },
  title: {
    color: '#344C5A',
    fontSize: 12
  },
  resultContainer: {
    position: 'absolute',
    zIndex: 1,
    width: '85%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#F3F4F5',
    borderRadius: 7,
    marginTop: '18%',
    marginBottom: '35%',
    shadowColor: '#F3F4F5',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2
  },
  modalStyles: {
    justifyContent: 'flex-start',
    height: Platform.OS === 'ios' ? '45%' : '55%',
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
  searchBoxContainer: {
    width: '85%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 9,
    borderColor: color('#344C5A')
      .alpha(0.2)
      .lighten(0.8),
    borderWidth: StyleSheet.hairlineWidth,
    shadowColor: color('#344C5A').alpha(0.3),
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 2,
    backgroundColor: '#fff'
  },
  searchInput: {
    height: 40,
    width: '80%'
  },
  searchText: {
    width: '53.33%',
    color: 'rgba(52,76,90,0.5)',
    fontSize: 12,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: '5%'
  }
});

export const pinnedCalendarStyles = StyleSheet.create({
  pinnedContainer: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'space-around',
    zIndex: 0,
    paddingVertical: 20,
    paddingHorizontal: -40,
    marginTop: '18%',
    flex: 1,
    shadowColor: '#F3F4F5'
  },
  renderList: {
    flex: 1,
    width: '100%'
  },
  searchInput: {
    height: 40,
    width: '80%'
  },
  userInformation: {
    textAlign: 'center',
    fontSize: 10,
    maxWidth: 50
  },
  cancelIcon: {
    marginLeft: -23,
    borderRadius: 10
  },
  cancelTwoIcon: {
    height: 15,
    width: 15
  },
  avatarContainer: {
    paddingHorizontal: 8,
    flexDirection: 'row'
  },
  iconStyle: {
    color: '#1E8FE1',
    borderRadius: 50
  }
});
