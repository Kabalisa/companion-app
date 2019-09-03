import { DISPLAY_MESSAGE } from './actionTypes';
import initialState from './state';

export default (state = initialState, actions) => {
  const { type, message } = actions;
  switch (type) {
    case DISPLAY_MESSAGE:
      return {
        ...state,
        messages: [...message, ...state.messages]
      };
    default:
      return state;
  }
};
