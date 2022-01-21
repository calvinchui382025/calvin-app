import { call, put, select } from 'redux-saga/effects';
import { actions } from '../reducer';
import * as TesterScreenSelectors from '../selectors';
import { url } from '../../../constants/URLS';
import axios from 'axios';
//======================================================
export const asyncSetCounter = async (val:number): Promise<any> => {
    return axios.post(`${url}/setCounter`, {
      data: {
        val: val,
      }
    }).then((res:any) => {
      return res?.data?.counter;
    }).catch((err:string) => {
      console.log(err);
      return 0;
    })
};
//======================================================
export default function*(): any {
  try {
    const uiCounterValue = yield select(TesterScreenSelectors.getCounter);
    const dbCounterValue = yield call(asyncSetCounter, uiCounterValue);
    if (dbCounterValue) {
      yield put(actions.setDbCounter(dbCounterValue));
    }
  } catch (e) {
    console.log(e);
  }
};