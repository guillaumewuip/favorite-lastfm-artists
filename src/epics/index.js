
import { combineEpics } from 'redux-observable';
import apiEpic from './api';
import filterEpic from './filter';

export default combineEpics(
  apiEpic,
  filterEpic
);
