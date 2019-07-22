import messageReducer from '../../messages/reducer';
import * as actions from '../../messages/actions';
import initialState from '../../messages/state';

describe('Message Reducer', () => {
  it('Reducer export test', () => {
    expect(messageReducer).toBeTruthy();
  });
  it('should return initialState', () => {
    const newState = messageReducer(initialState, {});
    expect(newState).toEqual(initialState);
  });
  it('Should Send Message', () => {
    const message = 'Hello Companions App';
    const action = actions.sendMessage('Hello Companions App');
    const newState = messageReducer(initialState, action);
    expect(newState.messages[0]).toEqual(message);
  });
});
