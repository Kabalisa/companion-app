/* eslint-disable no-undef */
import {
  createStore, combineReducers, compose, applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import messages from './messages';
import calendar from './calendar/reducers';
import attendees from './attendees/reducers';

export const rootReducer = combineReducers({
  [messages.stateKey]: messages.messageReducer,
  calendar,
  attendees
});

const middleWare = [thunk];

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(...middleWare))
);

export default store;
