import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Image } from 'react-native';

export const cacheImages = async (images = []) => images.map((image) => {
  if (typeof image === 'string') {
    return Image.prefetch(image);
  }
  return Asset.fromModule(image).downloadAsync();
});

export const cacheFonts = fonts => Font.loadAsync({
  ...fonts
});
