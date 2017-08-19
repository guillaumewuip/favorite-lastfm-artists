
import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './store';
import App from './app';

import { loadFavoriteTracks } from './actions';

console.log(`🚀 App version : ${VERSION}`); // eslint-disable-line no-undef

const store = configureStore();

store.dispatch(loadFavoriteTracks());

ReactDOM.render(<App />, document.querySelector('.js-app'));
