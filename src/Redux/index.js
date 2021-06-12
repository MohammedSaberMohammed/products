/* eslint-disable import/no-anonymous-default-export */
import rootReducer from './ActionsAndReducers';
import rootSaga from './Sagas';
import configureStore from './createStore';

export default () => {
  return configureStore(rootReducer, rootSaga);
};
