import { combineReducers } from 'redux';
// History
import { connectRouter } from 'connected-react-router';
// ========== After Refactoring Reducers========
import { reducer as auth } from './Auth';
import { reducer as products } from './Products';
import { reducer as entity } from './Entity';
import { reducer as layout } from './Layout';
import { reducer as notification } from './Notifications';

const createRootReducer = history => combineReducers({
  router: connectRouter(history),
  auth,
  entity,
  layout,
  products,
  notification,
});

export default createRootReducer;
