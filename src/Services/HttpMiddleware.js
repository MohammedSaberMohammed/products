// import { store } from '../App';
// import ResponseErrorMiddleware from './ResponseErrorMiddleware';
// import blockerActions from '../Redux/ActionsAndReducers/Blocker';

export default class HttpMiddleware {
  constructor(api) {
    this.api = api;
    // Call Transformers
    this.handleRequest();
    this.handleResponse();
  }

  handleRequest() {
    this.api.addRequestTransform(request => {
      const token = localStorage.getItem('jwtToken');

      // Add token if found
      if (token) {
        request.headers.UserAccessToken = `Bearer ${token}`;
      }
    });
  }

  handleResponse() {
    this.api.addResponseTransform(response => {
      if (!response.ok) {
        
        // stop it for now
        // In Case to push notification for user in case of error

        // new ResponseErrorMiddleware({ response, store }).watchForErrors();
      }
    });
  }
}
