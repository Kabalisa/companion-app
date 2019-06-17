import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({
  onPress,
  children,
  containerStyles,
  titleStyles,
  title,
  activeOpacity,
  ...props
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={containerStyles}
    activeOpacity={activeOpacity}
    {...props}
  >
    {children || null}
    <Text style={titleStyles}>{title}</Text>
  </TouchableOpacity>
);

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  children: PropTypes.element,
  containerStyles: PropTypes.shape({}),
  titleStyles: PropTypes.shape({}),
  title: PropTypes.string,
  activeOpacity: PropTypes.number
};
Button.defaultProps = {
  children: null,
  containerStyles: {},
  titleStyles: {},
  title: 'Button',
  activeOpacity: 1
};
export default Button;
