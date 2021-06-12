/* eslint-disable import/no-anonymous-default-export */
import { createStore, compose, applyMiddleware } from 'redux';

import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
// Env
import Env from '../Services/Env';
// History
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

// ================= Initiate Store ============
export default (rootReducer, rootSaga) => {
  
  const middleware = [];
  const enhancers = [];

  const logger = createLogger({
    collapsed: true,
    duration: true,
    diff: true
  });

  if (Env === 'development') { 
    middleware.push(logger);
  }

  const sagaMiddleware = createSagaMiddleware();
  middleware.push(sagaMiddleware);
  middleware.push(routerMiddleware(history));

  enhancers.push(applyMiddleware(...middleware));

  // Check if REDUX_DEVTOOLS_EXTENSION exists to append it to middlewares
  window.__REDUX_DEVTOOLS_EXTENSION__ && enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());

  const store = createStore(rootReducer(history), compose(...enhancers));

  // run saga
  sagaMiddleware.run(rootSaga);

  return store;
};
