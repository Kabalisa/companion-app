import * as actions from '../../messages/actions';
import * as types from '../../messages/actionTypes';

describe('actions', () => {
  it('should create an action to send Message', () => {
    const message = 'payload';
    const expectedAction = {
      type: types.SEND_MESSAGE,
      message
    };
    expect(actions.sendMessage(message)).toEqual(expectedAction);
  });
});
