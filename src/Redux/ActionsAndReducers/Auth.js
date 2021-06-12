import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ---------------- Initial State --------------- */

const INITIAL_STATE = Immutable({
  loading: true,
  isAuthenticated: false,
  profileReceived: false,
  
  token: null,
  error: null,
  profile: null,
});

/* ----------------- Actions And Reducers --------------- */

const { Types, Creators } = createActions({
  setToken: ['token'],
  setLoading: ['loading'],

  getProfile: null,
  getProfileSuccess: ['data'],
  getProfileFailure: ['error'],

  reset: null
}, {
  prefix: 'Auth/'
});

export const AuthTypes = Types;
export default Creators;

/* --------------------- Reducers ------------------- */

const setToken = (state, { token }) => state.merge({ token });

const setLoading = (state, { loading }) => state.merge({ loading });

const getProfile = state => state.merge({ loading: true });

const getProfileSuccess = (state, { data }) => state.merge({
  loading: false,
  error: null,
  profileReceived: true,
  isAuthenticated: true,
  profile: {
    ...state.profile || {},
    ...data,
  }
});

const getProfileFailure = (state, { error }) => state.merge({
  loading: false,
  isAuthenticated: false,
  error
});

export const reset = () => INITIAL_STATE;

/* -------------------- Hook up Reducers with actions ------------------ */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_TOKEN]: setToken,
  [Types.SET_LOADING]: setLoading,

  [Types.GET_PROFILE]: getProfile,
  [Types.GET_PROFILE_SUCCESS]: getProfileSuccess,
  [Types.GET_PROFILE_FAILURE]: getProfileFailure,

  [Types.RESET]: reset,
});
