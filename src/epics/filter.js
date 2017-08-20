
import { combineEpics } from 'redux-observable';

import {
  SEARCH_TERM,
  saveSearchTerm,
} from '../actions';

const searchTermEpic = (action$) => action$
  .ofType(SEARCH_TERM)
  .debounceTime(300)
  .map((action) => saveSearchTerm(action.term));

export default combineEpics(
  searchTermEpic
);
