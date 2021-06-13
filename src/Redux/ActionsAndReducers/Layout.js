import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Initial State ------------- */
const INITIAL_STATE = Immutable({
  selectedView: 'Grid',
  integrationMethod: 'Dummy',
});

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  updateView: [ 'selectedView' ],
  updateIntegrationMethod: [ 'integrationMethod' ],
}, {
  prefix: 'Layout/',
});

export const LayoutTypes = Types;
export default Creators;

/* ------------- Reducers ------------- */
export const updateFavoriteView = (state, { selectedView }) => state.merge({ selectedView });
export const updateIntegrationMethod = (state, { integrationMethod }) => state.merge({ integrationMethod });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_VIEW]: updateFavoriteView,
  [Types.UPDATE_INTEGRATION_METHOD]: updateIntegrationMethod,
});
