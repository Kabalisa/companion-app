import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import BackButton from '../../../shared/components/Buttons/BackButton';
import CalendarButton from '../../../shared/components/Buttons/CalendarButton';
import AddCalendarButton from '../OtherCalendar/components/addCalendarButton';
import Avatar from '../../../shared/components/UserAvatar/Avatar';
import { headerStyles } from './styles';

const Header = ({
  goBack,
  onToggle,
  closeIcon,
  onSearchPress,
  usersHeaderAvatar
}) => (
  <View style={headerStyles.container}>
    <BackButton onPress={goBack} />
    <View style={headerStyles.rightContent}>
      <View style={headerStyles.avatarContainer}>
        {usersHeaderAvatar.map((avatar, index) => (
          <View key={avatar.userId} style={headerStyles.avatartItem}>
            <Avatar profileAvatar={avatar.imageUrl} colorIndex={index} />
          </View>
        ))}
        <View style={headerStyles.avatartItem}>
          <AddCalendarButton onPress={onSearchPress} />
        </View>
      </View>
      <CalendarButton onPress={onToggle} closeIcon={closeIcon} />
    </View>
  </View>
);

Header.propTypes = {
  goBack: PropTypes.func.isRequired,
  usersHeaderAvatar: PropTypes.arrayOf(
    PropTypes.shape({
      imageUrl: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired
    })
  ).isRequired,
  closeIcon: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
  onSearchPress: PropTypes.func.isRequired
};
Header.defaultProps = {
  closeIcon: true
};
export default Header;
