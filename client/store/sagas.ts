import { spawn } from '@redux-saga/core/effects';
import testerScreenSagas from '../screens/Tester/sagas';
//======================================================
export default function* root() {
  yield spawn(testerScreenSagas);
}