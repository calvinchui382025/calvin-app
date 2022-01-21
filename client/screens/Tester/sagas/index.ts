import { takeLatest } from 'redux-saga/effects';
import { actions } from '../reducer';

import apiSetCounter from './api-setCounter';
//======================================================
export default function*() {
  yield takeLatest(actions.setCounter.type, apiSetCounter);
}