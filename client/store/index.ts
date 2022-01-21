import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas';
import reducers from './reducers';
//======================================================
export type IState = ReturnType<typeof reducers>;
//======================================================
const sagaMiddleware = createSagaMiddleware();
//======================================================
const middlewares = [sagaMiddleware];
//======================================================
export const store = configureStore({
  reducer: reducers,
  middleware: middlewares,
});
//======================================================
(window as any).store = store;
sagaMiddleware.run(rootSaga);