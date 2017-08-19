
import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import reducers from './reducers';
import epics from './epics';

import LastFM from './services/lastfm';

const lastFMClient = LastFM(LASTFM_API_KEY);

const rootEpicMiddleware = createEpicMiddleware(epics, {
  dependencies: {
    lastFM: lastFMClient,
  },
});

const configureStore = () => createStore(reducers, compose(
  applyMiddleware(rootEpicMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f,
));

export default configureStore;

