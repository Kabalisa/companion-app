import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const HeaderLeft = ({ profileAvatar }) => (
  <Image
    source={{ uri: profileAvatar }}
    style={styles.navigationProfileAvatar}
  />
);

HeaderLeft.propTypes = {
  profileAvatar: PropTypes.string
};

HeaderLeft.defaultProps = {
  profileAvatar: ''
};

export default HeaderLeft;
