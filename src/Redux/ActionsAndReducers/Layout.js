import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Initial State ------------- */
const INITIAL_STATE = Immutable({
  userEmail: '', // to update ui with data from firestor [ only for demo purpose ]
  selectedView: 'Grid',
  integrationMethod: 'Dummy',
});

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  updateView: [ 'selectedView' ],
  updateIntegrationMethod: [ 'integrationMethod' ],
  updateEmail: [ 'userEmail' ]
}, {
  prefix: 'Layout/',
});

export const LayoutTypes = Types;
export default Creators;

/* ------------- Reducers ------------- */
export const updateFavoriteView = (state, { selectedView }) => state.merge({ selectedView });
export const updateIntegrationMethod = (state, { integrationMethod }) => state.merge({ integrationMethod });
export const updateEmail = (state, { userEmail }) => state.merge({ userEmail });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_VIEW]: updateFavoriteView,
  [Types.UPDATE_INTEGRATION_METHOD]: updateIntegrationMethod,
  [Types.UPDATE_EMAIL]: updateEmail,
});
