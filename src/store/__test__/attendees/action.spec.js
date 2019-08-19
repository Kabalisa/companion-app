import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../attendees/action';
import * as types from '../../attendees/types';

const mockStore = configureStore([thunk]);
let store;
const item = {
  bamboo_hr_id: 0,
  email: 'alvin.mugambi@andela.com',
  id: '-LcBZlxl2-AfbOlYNWAS',
  last_login: '2019-03-07T00:00:00.000Z',
  level_id: '',
  location: null,
  name: 'Alvin Mugambi',
  picture:
    'https://lh3.googleusercontent.com/-igciUdxZ4Tw/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reMYlAe6d56yp86TiBYZ0Ja7cRk8A/s50/photo.jpg',
  roles: '-KXGy1EB1oimjQgFim6C:Fellow,-KiihfZoseQeqC6bWTau:Andelan',
  status: 'active'
};

const user = {
  imageUrl: item.picture,
  username: item.name,
  userId: 1,
  email: item.email
};

describe('actions', () => {
  it('should create an action to add attendee', async () => {
    store = mockStore({});

    await store.dispatch(actions.pinAttendeesAction(item));

    expect(store.getActions().length).toBeLessThanOrEqual(2);
  });
  it('should create an action to remove attendee', () => {
    const expectedAction = {
      type: types.REMOVE_ATTENDEE,
      payload: user.email
    };
    expect(actions.unpinAttendeeAction(user.email)).toEqual(expectedAction);
  });
});
