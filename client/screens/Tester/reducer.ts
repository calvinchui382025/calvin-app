import { ImmerReducer, createReducerFunction, createActionCreators } from 'immer-reducer';
//======================================================
type TesterScreenTypes = {
  counter: number;
  dbCounter: number;
}
type State = TesterScreenTypes;
//======================================================
const initialState = {
  counter: 0,
  dbCounter: 0,
};
//======================================================
class TesterScreenReducer extends ImmerReducer<State> {
  setCounter(val: number) {
    this.draftState.counter = val;
  }
  setDbCounter(val: number) {
    this.draftState.dbCounter = val;
  }
}
//======================================================
export const reducer = createReducerFunction(TesterScreenReducer, initialState);
export const actions = createActionCreators(TesterScreenReducer);