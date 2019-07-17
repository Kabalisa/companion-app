import {
  StyleSheet, Dimensions, Platform, StatusBar
} from 'react-native';
import { scale } from 'react-native-size-matters';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
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
    width: DEVICE_WIDTH,
    borderRadius: scale(10),
    paddingVertical: scale(5),
    paddingHorizontal: scale(5),
    zIndex: 100
  }
});

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginTop: STATUSBAR_HEIGHT,
    height: DEVICE_HEIGHT || 0
  }
});
