import {
  handleGoogleResponse,
  getAccessToken,
  handleHints
} from '../../utils/helpers';
import * as types from './actionTypes';
import DialogFlow from '../../DialogFlow';
import { resetAttendeeAction } from '../attendees/action';

export const displayMessage = message => ({
  type: types.DISPLAY_MESSAGE,
  message
});

export const dialogFlowRequest = () => ({
  type: types.SEND_DIALOGFLOW_REQUEST
});

export const responseDialogFlowSuccess = () => ({
  type: types.RESPONSE_DIALOGFLOW_SUCCESS
});

export const responseDialogFlowFailure = () => ({
  type: types.RESPONSE_DIALOGFLOW_FAILURE
});
export const hintActivation = () => ({
  type: types.HINT_ACTIVATION
});

export const successDisplay = (response, isHintActivated) => async (dispatch) => {
  const botMessage = handleGoogleResponse(response);
  if (!isHintActivated) {
    return [
      dispatch(responseDialogFlowSuccess()),
      dispatch(displayMessage(botMessage))
    ];
  }
  const appendedBotMessage = handleHints(botMessage);
  return [
    dispatch(responseDialogFlowSuccess()),
    dispatch(displayMessage(appendedBotMessage))
  ];
};

export const sendEventToDialogFlow = attendeesWithPayload => async (dispatch) => {
  const {
    attendees, email
  } = attendeesWithPayload;
  const accessToken = await getAccessToken();
  const payload = {
    email, accessToken
  };
  try {
    dispatch(dialogFlowRequest());
    DialogFlow.requestEventPayload(
      'attendees',
      { attendees },
      payload,
      (response) => {
        dispatch(successDisplay(response));
        dispatch(resetAttendeeAction());
      },
    );
  } catch (error) {
    dispatch(responseDialogFlowFailure());
  }
};

export const sendToDialogFlow = (message, isHintActivated) => async (dispatch) => {
  try {
    dispatch(dialogFlowRequest());
    const {
      text, email, token
    } = message;
    const accessToken = await getAccessToken();
    const payload = {
      email, token, accessToken
    };
    DialogFlow.requestQueryPayload(text, payload, (response) => {
      dispatch(successDisplay(response, isHintActivated));
    });
  } catch (error) {
    dispatch(responseDialogFlowFailure());
  }
};

export const sendToDialogFlowDisplay = (message,
  isHintActivated) => async dispatch => [
  dispatch(displayMessage([message])),
  dispatch(sendToDialogFlow(message, isHintActivated))
];
