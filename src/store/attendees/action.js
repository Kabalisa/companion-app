import { PIN_ATTENDEES, REMOVE_ATTENDEE, RESET_ATTENDEE } from './types';

export const pinAttendeesAction = item => (dispatch) => {
  const alternativeImage = 'https://cdn.iconscout.com/icon/free/png-512/account-profile-avatar-man-circle-round-user-30452.png';
  const user = {
    imageUrl: item.picture || alternativeImage,
    username: item.name,
    userId: item.id,
    email: item.email
  };
  dispatch({
    type: PIN_ATTENDEES,
    payload: user
  });
};

export const unpinAttendeeAction = email => ({
  type: REMOVE_ATTENDEE,
  payload: email
});

export const resetAttendeeAction = () => ({
  type: RESET_ATTENDEE
});
