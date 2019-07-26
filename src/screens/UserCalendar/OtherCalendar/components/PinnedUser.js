import React from 'react';
import PropTypes from 'prop-types';
import {
  View, FlatList, Image, TouchableOpacity
} from 'react-native';
import { Text, Avatar } from 'react-native-elements';
import { pinnedCalendarStyles as pinnedStyles } from '../../components/styles';
import unPinIcon from '../../../../assets/unpin.png';

const PinnedUser = ({ pinnedUsers, removeUser }) => (
  <View style={pinnedStyles.pinnedContainer}>
    <FlatList
      horizontal
      data={pinnedUsers}
      keyExtractor={(item, index) => `${index}`}
      style={pinnedStyles.renderList}
      renderItem={item => (
        <View style={pinnedStyles.avatarContainer}>
          <View>
            <Avatar
              rounded
              size="medium"
              source={{
                uri: item.item.imageUrl
              }}
              title={item.item.username}
              titleStyle={pinnedStyles.title}
              key={item.userId}
              containerStyle={pinnedStyles.list}
            />
            <Text style={pinnedStyles.userInformation}>
              {item.item.username}
            </Text>
          </View>
          <View style={pinnedStyles.cancelIcon}>
            <TouchableOpacity onPress={() => removeUser(item.item)}>
              <Image style={pinnedStyles.cancelTwoIcon} source={unPinIcon} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  </View>
);

PinnedUser.propTypes = {
  pinnedUsers: PropTypes.instanceOf(Array).isRequired,
  removeUser: PropTypes.func.isRequired
};
export default PinnedUser;
