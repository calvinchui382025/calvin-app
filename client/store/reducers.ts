import { combineReducers } from '@reduxjs/toolkit';
import { reducer as TesterScreenReducers } from '../screens/Tester/reducer';
//======================================================
export default combineReducers({
  TesterScreenReducers: TesterScreenReducers,
})