import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Initial State ------------- */
const INITIAL_STATE = Immutable({
  active: false,
  status: 'success',
  message: null,
});

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  notify: ['status', 'message', 'configs'],
  resetProp: ['prop'],
}, {
  prefix: 'Notification/',
});

export const NotificationTypes = Types;
export default Creators;

/* ------------- Reducers ------------- */
export const notify = (state, { message, status, configs = {} }) => state.merge({
  active: true,
  status,
  message,
  configs,
});

export const resetProp = (state, { prop }) => state.merge({ [prop]: INITIAL_STATE[prop] });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.NOTIFY]: notify,
  [Types.RESET_PROP]: resetProp,
});
