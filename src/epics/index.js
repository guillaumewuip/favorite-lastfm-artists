
import { combineEpics } from 'redux-observable';
import apiEpic from './api';

export default combineEpics(
  apiEpic
);
