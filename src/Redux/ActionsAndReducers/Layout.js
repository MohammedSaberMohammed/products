import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Initial State ------------- */
const INITIAL_STATE = Immutable({
  isListView: false,
});

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  toggleView: null,
}, {
  prefix: 'Layout/',
});

export const LayoutTypes = Types;
export default Creators;

/* ------------- Reducers ------------- */
export const toggleView = state => state.merge({
  isListView: !state.isListView,
});

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TOGGLE_VIEW]: toggleView,
});
