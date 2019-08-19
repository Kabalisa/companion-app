import { uniqBy } from 'lodash';
import { PIN_ATTENDEES, REMOVE_ATTENDEE } from './types';

export const INITIAL_STATE = {
  error: {},
  text: '',
  pinnedAttendees: [],
  isLoading: false
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case PIN_ATTENDEES:
      return {
        ...state,
        pinnedAttendees: uniqBy([...state.pinnedAttendees, payload], 'userId')
      };

    case REMOVE_ATTENDEE:
      return {
        ...state,
        pinnedAttendees: state.pinnedAttendees
          .filter(user => user.email !== payload)
      };
    default:
      return state;
  }
};
