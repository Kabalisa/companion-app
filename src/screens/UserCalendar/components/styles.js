import {
  StyleSheet, Dimensions, StatusBar, Platform
} from 'react-native';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 0 : StatusBar.currentHeight;
const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
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
    flex: 1,
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
    backgroundColor: '#fff',
    height: scale(48)
  },
  rightContent: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    marginHorizontal: scale(10)
  },
  avatartItem: {
    marginLeft: -10
  },
  iconContainer: {
    backgroundColor: '#fff',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: scale(26) / 2,
    marginRight: scale(5)
  },
  pinnedUsersContainer: {
    flexDirection: 'row'
  }
});

export const addEventStyles = StyleSheet.create({
  addEventsButton: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addEventsIcon: {
    width: scale(26),
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
  listItem: {
    borderColor: '#E9F1F4',
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    alignSelf: 'center',
    padding: 4
  },
  title: {
    color: '#344C5A',
    fontSize: 12
  },
  resultContainer: {
    zIndex: 1,
    width: '85%',
    alignSelf: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#F3F4F5'
  },
  modal: {
    margin: 0
  },
  innerModel: {
    flex: 1
  },
  backDrop: {
    flex: 0.5
  },
  contentContainer: {
    flex: 0.5,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width: DEVICE_WIDTH
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
  searchBoxContainer: {
    width: '85%',
    height: scale(52),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: scale(20),
    padding: scale(10),
    borderRadius: scale(9),
    borderWidth: scale(2),
    elevation: 5,
    shadowColor: 'rgba(0,0,0,0.03)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    backgroundColor: '#fff',
    borderColor: '#F3F4F5'
  },
  searchInput: {
    height: scale(48),
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
    alignSelf: 'center',
    justifyContent: 'space-around',
    zIndex: 0,
    marginTop: scale(10)
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
