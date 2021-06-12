import strings from './Strings';
// Lodash
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

export default class ResponseErrorMiddleware {
  constructor({ response, store }) {
    this.response = response;
    this.store = store;
    this.serverError = null;
    this.errors = [];
    this.setDefaultErrorMessage();
  }

  setDefaultErrorMessage() {
    if (get(this.response, 'data.error.message')) {
      this.serverError = this.response.data.error.message;
    }

    else if (typeof get(this.response, 'data.error.code') === 'string') {
      this.serverError = this.response.data.error.code;
    }

    else if (get(this.response, 'data.error.code.value')) {
      this.serverError = this.response.data.error.code.value;
    }

    else if (typeof get(this.response, 'data') === 'string') {
      this.serverError = this.response.data;
    }

    else if (typeof get(this.response, 'data.0') === 'string') {
      this.serverError = this.response.data;
    }
  }

  watchForErrors() {
    const { status } = this.response;

    switch (this.response.problem) {
      case 'CLIENT_ERROR':
      case 'SERVER_ERROR':
        if ([400, 401, 403, 404, 500, 502, 503].indexOf(status) !== -1) {
          this.errors.push(this.serverError || strings.serverErrors[status]);
        }
        break;
      case 'TIMEOUT_ERROR':
        this.errors.push(this.serverError || strings.serverErrors.TIMEOUT);
        break;
      case 'CONNECTION_ERROR':
      case 'NETWORK_ERROR':
      case 'CANCEL_ERROR':
        this.errors.push(this.serverError || strings.serverErrors.CANCEL);
        break;
      default:
        this.errors.push(this.serverError || strings.serverErrors.UNKNOWN);
    }

    // Push The Notifications To The App
    if (!isEmpty(this.errors)) {
      this.errors.map((err, index) => setTimeout(() => this.store.dispatch({
        type: 'Notification/NOTIFY',
        status: 'error',
        message: err
      }), index));
    }
  }
}
