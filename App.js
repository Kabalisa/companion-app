import React from 'react';
import { Provider } from 'react-redux';
import Navigation from './src/navigation/index';
import store from './src/store';

export default () => (
  <Provider store={store}>
    <Navigation />
  </Provider>
);
