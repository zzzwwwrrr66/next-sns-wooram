import { applyMiddleware, createStore, compose } from 'redux';
import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from 'react-redux';

import { createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';


import reducer from './recusers';
import rootSaga from '../sagas';

import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';

const loggerMiddleware = ({dispatch, getState}) => (next) => (action) => {

  return next(action);
}

const configureStore = (context) => {
  console.log('configureStore',context);
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [loggerMiddleware, sagaMiddleware];
  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(
      applyMiddleware(...middlewares),
    );
  const store = createStore(reducer, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper(configureStore, { debug: process.env.NODE_ENV === 'development' });


export default wrapper;
