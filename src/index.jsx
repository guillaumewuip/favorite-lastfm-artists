
import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './store';
import App from './app';

console.log(`🚀 App version : ${VERSION}`);

const store = configureStore();

// store.dispatch({
//     type: INIT,
// });

ReactDOM.render(
  <App />,
  document.querySelector('.js-app')
);
