import { scale, verticalScale } from 'react-native-size-matters';
import { Platform, Dimensions } from 'react-native';
import {
  MIN_PHONE_WIDTH,
  MIN_TABLET_WIDTH,
  MIN_ANDROID_HEIGHT_PHONE
} from '../../constants/screenSizes';

export const between = (x, min, max) => x >= min && x <= max;

export const responsiveSizes = {
  responsiveMenuItemBorderRadius: 19,
  responsiveMenuItemAspectRatio: 123 / 148,
  responsiveMenuItemImageWidth: verticalScale(54),
  responsiveTextStylesFontSize: 12,
  responsiveTextStylesLineHeight: 15,
  responsiveMenuItemWidth: scale(123),
  responsiveMessagePadding: scale(20),
  responsiveGreetingsTitleMarginBottom: scale(20),
  responsivemenuItemImageDisplay: 'flex',
  responsiveMenuItemImageMarginBottom: scale(20)
};

const responsiveIos = (width) => {
  if (width <= MIN_PHONE_WIDTH) {
    return {
      responsiveTextStylesFontSize: 9,
      responsiveTextStylesLineHeight: 12,
      responsiveMenuItemBorderRadius: 10,
      responsiveMenuItemWidth: scale(100),
      responsiveMenuItemImageWidth: verticalScale(44),
      responsiveMessagePadding: scale(18),
      responsiveGreetingsTitleMarginBottom: scale(12)
    };
  }
  return {
    responsiveTextStylesFontSize: 12,
    responsiveTextStylesLineHeight: 15,
    responsiveMenuItemWidth: scale(123),
    responsiveMessagePadding: scale(20),
    responsiveGreetingsTitleMarginBottom: scale(20)
  };
};

const responsiveAndroid = (width, height) => {
  const responsiveStyle = {};
  if (width <= MIN_PHONE_WIDTH && height <= MIN_ANDROID_HEIGHT_PHONE) {
    responsiveStyle.responsivemenuItemImageDisplay = 'none';
    responsiveStyle.responsiveMenuItemAspectRatio = 90 / 60;
    responsiveStyle.responsiveMenuItemWidth = scale(110);
    responsiveStyle.responsiveMenuItemBorderRadius = 10;
  } else if (width >= MIN_PHONE_WIDTH && between(width / height, 0.47, 0.55)) {
    responsiveStyle.responsiveMenuItemAspectRatio = 123 / 130;
  } else if (width >= MIN_PHONE_WIDTH && between(width / height, 0.56, 0.61)) {
    responsiveStyle.responsiveMenuItemAspectRatio = 123 / 130;
    responsiveStyle.responsiveMenuItemWidth = 120;
    responsiveStyle.responsiveMenuItemImageWidth = verticalScale(44);
    responsiveStyle.responsiveMessagePadding = scale(15);
    responsiveStyle.responsiveGreetingsTitleMarginBottom = scale(15);
  } else if (width <= MIN_PHONE_WIDTH && between(width / height, 0.56, 0.6)) {
    responsiveStyle.responsiveMenuItemAspectRatio = 123 / 130;
    responsiveStyle.responsiveMenuItemWidth = 90;
    responsiveStyle.responsiveMenuItemImageWidth = verticalScale(44);
    responsiveStyle.responsiveMessagePadding = scale(10);
    responsiveStyle.responsiveGreetingsTitleMarginBottom = scale(15);
    responsiveStyle.responsiveTextStylesFontSize = 10;
    responsiveStyle.responsiveMenuItemBorderRadius = 10;
    responsiveStyle.responsiveMenuItemImageMarginBottom = scale(10);
  }
  return responsiveStyle;
};

const responsiveStyles = () => {
  const { width, height } = Dimensions.get('window');
  if (width >= MIN_TABLET_WIDTH) {
    return {
      ...responsiveSizes,
      responsiveTextStylesFontSize: 16,
      responsiveTextStylesLineHeight: 18,
      responsiveMenuItemAspectRatio: 123 / 130,
      responsiveMenuItemWidth: scale(90),
      responsiveMessagePadding: scale(20),
      responsiveGreetingsTitleMarginBottom: scale(10)
    };
  }

  if (Platform.OS === 'ios') {
    return { ...responsiveSizes, ...responsiveIos(width) };
  } if (Platform.OS === 'android') {
    return { ...responsiveSizes, ...responsiveAndroid(width, height) };
  }

  return responsiveSizes;
};

export default responsiveStyles;
