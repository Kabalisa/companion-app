import { scale, verticalScale } from 'react-native-size-matters';
import { Platform, Dimensions } from 'react-native';
import responsiveStyles, { between } from '../responsiveStyles';

describe('Responsive Styles', () => {
  const defaultOutput = {
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

  test('test between functionality', () => {
    expect(between(4, 2, 6)).toBeTruthy();
  });

  test('test responsiveStyles Android functionality', () => {
    const output = {
      ...defaultOutput,
      responsiveMenuItemAspectRatio: 123 / 130,
      responsiveMenuItemImageWidth: verticalScale(44),
      responsiveTextStylesFontSize: 16,
      responsiveTextStylesLineHeight: 18,
      responsiveMenuItemWidth: 120,
      responsiveMessagePadding: scale(15),
      responsiveGreetingsTitleMarginBottom: scale(15)
    };

    Object.defineProperty(Platform, 'OS', {
      value: 'android'
    });

    expect(responsiveStyles()).toEqual(output);
  });

  test('test responsiveness on ios small screens', () => {
    const output = {
      ...defaultOutput,
      responsiveMenuItemBorderRadius: 10,
      responsiveMenuItemImageWidth: verticalScale(44),
      responsiveTextStylesFontSize: 9,
      responsiveTextStylesLineHeight: 12,
      responsiveMenuItemWidth: scale(100),
      responsiveMessagePadding: scale(18),
      responsiveGreetingsTitleMarginBottom: scale(12)
    };

    Object.defineProperty(Dimensions, 'get', {
      value: __value => ({ width: 320 })
    });

    Object.defineProperty(Platform, 'OS', {
      value: 'ios'
    });

    expect(responsiveStyles()).toEqual(output);
  });

  test('test responsiveness on android small screens', () => {
    const output = {
      ...defaultOutput,
      responsiveMenuItemBorderRadius: 10,
      responsiveMenuItemAspectRatio: 90 / 60,
      responsiveMenuItemWidth: scale(110),
      responsivemenuItemImageDisplay: 'none'
    };

    Object.defineProperty(Dimensions, 'get', {
      value: __value => ({ width: 320, height: 427 })
    });

    Object.defineProperty(Platform, 'OS', {
      value: 'android'
    });

    expect(responsiveStyles()).toEqual(output);
  });

  test('test responsiveness on android normal size screen', () => {
    const output = {
      ...defaultOutput,
      responsiveMenuItemAspectRatio: 123 / 130
    };

    Object.defineProperty(Dimensions, 'get', {
      value: __value => ({ width: 412, height: 775 })
    });

    Object.defineProperty(Platform, 'OS', {
      value: 'android'
    });

    expect(responsiveStyles()).toEqual(output);
  });

  test('test responsiveness on android short normal screen size', () => {
    const output = {
      ...defaultOutput,
      responsiveMenuItemBorderRadius: 10,
      responsiveMenuItemAspectRatio: 123 / 130,
      responsiveMenuItemImageWidth: verticalScale(44),
      responsiveTextStylesFontSize: 10,
      responsiveMenuItemWidth: 90,
      responsiveMessagePadding: scale(10),
      responsiveGreetingsTitleMarginBottom: scale(15),
      responsiveMenuItemImageMarginBottom: scale(10)
    };

    Object.defineProperty(Dimensions, 'get', {
      value: __value => ({ width: 320, height: 534 })
    });

    Object.defineProperty(Platform, 'OS', {
      value: 'android'
    });

    expect(responsiveStyles()).toEqual(output);
  });
});
