import { DISPLAY_MESSAGE } from './actionTypes';
import initialState from './state';


export default (state = initialState, actions) => {
  const { type } = actions;
  switch (type) {
    case DISPLAY_MESSAGE:
      return {
        ...state,
        messages: [actions.message, ...state.messages]
      };
    default:
      return state;
  }
};
