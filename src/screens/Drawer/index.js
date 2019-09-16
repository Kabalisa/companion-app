import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { store } from '../../store';
import ProfileComponent from './components/ProfileComponent';
import LogoutButton from './components/LogoutButton';
import { signOut } from '../../services/AuthService';
import ToogleComponent from './components/ToogleComponent';
import styles from './styles';
import { hintActivation } from '../../store/messages/actions';

export class Drawer extends Component {
  logoutUser = async () => {
    const {
      navigation: { navigate }
    } = this.props;
    try {
      const {
        auth: { accessToken }
      } = store.getState();
      await signOut(accessToken);
      navigate('Login');
    } catch (error) {
      navigate('Login');
    }
  };

  toogleSwitch = () => {
    const { hintActivate } = this.props;
    hintActivate();
  };

  render() {
    const { isHintActivated } = this.props;
    const {
      auth: { currentUser }
    } = store.getState();
    const {
      email, family_name: lastName, given_name: firstName, picture
    } = currentUser;
    return (
      <View style={styles.drawerContainer}>
        <ProfileComponent
          userData={{
            email,
            firstName,
            lastName,
            picture
          }}
        />
        <ToogleComponent
          toogleSwitch={this.toogleSwitch}
          switchValue={isHintActivated}
        />
        <LogoutButton onPress={this.logoutUser} />
      </View>
    );
  }
}

Drawer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  }),
  isHintActivated: PropTypes.bool,
  hintActivate: PropTypes.func
};

Drawer.defaultProps = {
  navigation: {
    navigate: () => {}
  },
  isHintActivated: true,
  hintActivate: () => {}
};

export const mapStateToProps = state => ({
  isHintActivated: state.messages.isHintActivated
});

export const mapDispatchToProps = dispatch => ({
  hintActivate: () => dispatch(hintActivation())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Drawer);
