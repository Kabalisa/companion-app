import { createStore } from 'redux';
import { rootReducer } from '..';
import * as actions from '../messages/actions';

describe('Store test', () => {
  it('Should Handle send message', () => {
    const message = 'Hi companion App';
    const store = createStore(rootReducer);
    const action = actions.sendMessage(message);
    store.dispatch(action);

    const sentMessage = store.getState();
    expect(sentMessage.messages.messages[0]).toEqual(message);
  });
});
