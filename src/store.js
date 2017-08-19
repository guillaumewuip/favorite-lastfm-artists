
import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import reducers from './reducers';

const rootEpicMiddleware = createEpicMiddleware(combineEpics());

const configureStore = () => createStore(reducers, compose(
  applyMiddleware(rootEpicMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f,
));

export default configureStore;

