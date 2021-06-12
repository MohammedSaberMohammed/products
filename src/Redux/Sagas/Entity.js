/* eslint-disable import/no-anonymous-default-export */
import api from '../../Services/Api';
import { call, put } from 'redux-saga/effects';
// Actions
import EntityActions from '../ActionsAndReducers/Entity';

export default {
  * get({ id, data }) {
    if (id === 'Products-List') {
      const res = yield call(api.products.list, data);

      if (res.ok) {
        yield put(EntityActions.getSucceeded(id, res.data || {}));
      } else {
        yield put(EntityActions.getFailed(id, res.data || {}));
      }
    }

    else if (id === 'Single-Product-Details') {
      const res = yield call(api.products.details, data);

      if (res.ok) {
        yield put(EntityActions.getSucceeded(id, res.data || {}));
      } else {
        yield put(EntityActions.getFailed(id, res.data || {}));
      }
    }
  },
  * post({ id, data }) {
    // if (id === '') {
    //   const res = yield call(api., data);

    //   if (res.ok) {
    //     yield put(EntityActions.postSucceeded(id, res.data));
    //   } else {
    //     yield put(EntityActions.postFailed(id, res.data || {}));
    //   }
    // }
  }
};
