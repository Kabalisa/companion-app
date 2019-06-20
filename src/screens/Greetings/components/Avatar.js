import React from 'react';
import { Avatar } from 'react-native-gifted-chat';
import styles from './styles';

const UserAvatar = (props) => {
  const avatarProps = props;
  return (
    <Avatar
      {...avatarProps}
      position="left"
      imageStyle={{ left: [styles.conversationAvatar] }}
    />
  );
};

export default UserAvatar;
