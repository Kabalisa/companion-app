import { scale, verticalScale } from 'react-native-size-matters';
import { Platform, Dimensions } from 'react-native';
import {
  MIN_PHONE_WIDTH,
  MIN_TABLET_WIDTH,
  MIN_ANDROID_HEIGHT_PHONE
} from '../../constants/screenSizes';

export const between = (x, min, max) => x >= min && x <= max;

const responsiveStyles = () => {
  let responsiveMenuItemBorderRadius = 19;
  let responsiveMenuItemAspectRatio = 123 / 148;
  let responsiveMenuItemImageWidth = verticalScale(54);
  let responsiveTextStylesFontSize = 12;
  let responsiveTextStylesLineHeight = 15;
  let responsiveMenuItemWidth = scale(123);
  let responsiveMessagePadding = scale(20);
  let responsiveGreetingsTitleMarginBottom = scale(20);
  let responsivemenuItemImageDisplay = 'flex';
  let responsiveMenuItemImageMarginBottom = scale(20);

  const { width, height } = Dimensions.get('window');

  if (width >= MIN_TABLET_WIDTH) {
    responsiveTextStylesFontSize = 16;
    responsiveTextStylesLineHeight = 18;
    responsiveMenuItemAspectRatio = 123 / 130;
    responsiveMenuItemWidth = scale(90);
    responsiveMessagePadding = scale(20);
    responsiveGreetingsTitleMarginBottom = scale(10);
  }

  if (Platform.OS === 'ios') {
    if (width <= MIN_PHONE_WIDTH) {
      responsiveTextStylesFontSize = 9;
      responsiveTextStylesLineHeight = 12;
      responsiveMenuItemBorderRadius = 10;
      responsiveMenuItemWidth = scale(100);
      responsiveMenuItemImageWidth = verticalScale(44);
      responsiveMessagePadding = scale(18);
      responsiveGreetingsTitleMarginBottom = scale(12);
    } else {
      responsiveTextStylesFontSize = 12;
      responsiveTextStylesLineHeight = 15;
      responsiveMenuItemWidth = scale(123);
      responsiveMessagePadding = scale(20);
      responsiveGreetingsTitleMarginBottom = scale(20);
    }
  } else if (Platform.OS === 'android') {
    if (width <= MIN_PHONE_WIDTH && height <= MIN_ANDROID_HEIGHT_PHONE) {
      responsivemenuItemImageDisplay = 'none';
      responsiveMenuItemAspectRatio = 90 / 60;
      responsiveMenuItemWidth = scale(110);
      responsiveMenuItemBorderRadius = 10;
    } else if (width >= MIN_PHONE_WIDTH && between(width / height, 0.47, 0.55)) {
      responsiveMenuItemAspectRatio = 123 / 130;
    } else if (width >= MIN_PHONE_WIDTH && between(width / height, 0.56, 0.61)) {
      responsiveMenuItemAspectRatio = 123 / 130;
      responsiveMenuItemWidth = 120;
      responsiveMenuItemImageWidth = verticalScale(44);
      responsiveMessagePadding = scale(15);
      responsiveGreetingsTitleMarginBottom = scale(15);
    } else if (width <= MIN_PHONE_WIDTH && between(width / height, 0.56, 0.6)) {
      responsiveMenuItemAspectRatio = 123 / 130;
      responsiveMenuItemWidth = 90;
      responsiveMenuItemImageWidth = verticalScale(44);
      responsiveMessagePadding = scale(10);
      responsiveGreetingsTitleMarginBottom = scale(15);
      responsiveTextStylesFontSize = 10;
      responsiveMenuItemBorderRadius = 10;
      responsiveMenuItemImageMarginBottom = scale(10);
    }
  }

  return {
    responsiveTextStylesFontSize,
    responsiveTextStylesLineHeight,
    responsiveMenuItemBorderRadius,
    responsiveMenuItemAspectRatio,
    responsiveMenuItemWidth,
    responsiveMenuItemImageWidth,
    responsiveMessagePadding,
    responsiveGreetingsTitleMarginBottom,
    responsivemenuItemImageDisplay,
    responsiveMenuItemImageMarginBottom
  };
};

export default responsiveStyles;
