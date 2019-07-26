import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

export default StyleSheet.create({
  container: {
    padding: scale(5),
    borderRadius: scale(25 / 2),
    width: scale(28),
    height: scale(28),
    alignItems: 'flex-end',
    borderWidth: 2
  }
});
