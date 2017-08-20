
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store';
import App from './app';

import { loadFavoriteTracks } from './actions';

console.log(`🚀 App version : ${VERSION}`); // eslint-disable-line no-undef

const store = configureStore();

store.dispatch(loadFavoriteTracks());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('.js-app')
);
