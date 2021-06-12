import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
// Lodash
import _get from 'lodash/get';

/* ---------------- Initial State --------------- */
const INITIAL_STATE = Immutable({
  byId: {},
});

const INITIAL_SINGLE_ENTITY_STATE = Immutable({
  loading: false,
  received: false,
  posted: false,

  data: {},

  error: null,
  // Store responses
  responseFromGet: null,
  responseFromPost: null,
});

/* -------------- Types And Actions ------------- */
const { Types, Creators } = createActions({
  register: ['id'],

  get: ['id', 'data'],
  getSucceeded: ['id', 'data'],
  getFailed: ['id', 'error'],

  post: ['id', 'data'],
  postSucceeded: ['id', 'data'],
  postFailed: ['id', 'error'],

  update: ['id', 'data'],

  reset: ['id'],
  resetProp: ['id', 'prop'],
  resetResponseProps: ['id'],
}, {
  prefix: 'entity/',
});

export const EntityTypes = Types;
export default Creators;

/* ------------- Reducers ---------------- */
const updateState = (state, id, updates) => state.merge({
  byId: {
    ...state.byId,
    [id]: {
      ..._get(state, `byId.${id}`, {}),
      ...updates,
    },
  },
});

const register = (state, { id }) => updateState(state, id, INITIAL_SINGLE_ENTITY_STATE);

const get = (state, { id }) => updateState(state, id, {
  loading: true,
  error: null,
  responseFromGet: null,
});

const getSuccedded = (state, { id, data }) => updateState(state, id, {
  loading: false,
  error: null,
  received: true,
  responseFromGet: data || INITIAL_SINGLE_ENTITY_STATE.responseFromGet,
});

const getFailed = (state, { id, error }) => updateState(state, id, {
  error,
  loading: false,
  received: true,
});

const post = (state, { id }) => updateState(state, id, {
  loading: true,
  error: null,
  responseFromPost: null,
});

const postSuccedded = (state, { id, data }) => updateState(state, id, {
  loading: false,
  error: null,
  posted: true,
  responseFromPost: data || INITIAL_SINGLE_ENTITY_STATE.responseFromPost,
});

const postFailed = (state, { id, error }) => updateState(state, id, {
  posted: true,
  loading: false,
  error: error || {},
});

const update = (state, { id, data }) => updateState(state, id, {
  data: {
    ...state.byId[id].data,
    ...data,
  },
});

const reset = (state, { id }) => state.merge({
  byId: {
    ...state.byId,
    [id]: null,
  },
});

const resetProp = (state, { id, prop }) => updateState(state, id, {
  [prop]: INITIAL_SINGLE_ENTITY_STATE[prop],
});

const resetResponseProps = (state, { id }) => updateState(state, id, {
  received: INITIAL_SINGLE_ENTITY_STATE.received,
  posted: INITIAL_SINGLE_ENTITY_STATE.posted,
  error: INITIAL_SINGLE_ENTITY_STATE.error,
  responseFromGet: INITIAL_SINGLE_ENTITY_STATE.responseFromGet,
  responseFromPost: INITIAL_SINGLE_ENTITY_STATE.responseFromPost,
});
/* -------------- Hookup Types To Reducers -------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REGISTER]: register,
  // ======= Actions =======
  [Types.GET]: get,
  [Types.GET_SUCCEEDED]: getSuccedded,
  [Types.GET_FAILED]: getFailed,

  [Types.POST]: post,
  [Types.POST_SUCCEEDED]: postSuccedded,
  [Types.POST_FAILED]: postFailed,

  // ======== Update Internal Data ======
  [Types.UPDATE]: update,

  // Resets
  [Types.RESET]: reset,
  [Types.RESET_PROP]: resetProp,
  [Types.RESET_RESPONSE_PROPS]: resetResponseProps,
});
