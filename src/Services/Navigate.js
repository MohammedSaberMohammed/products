/* eslint-disable import/no-anonymous-default-export */
import {
  push, replace, goBack, goForward,
} from 'connected-react-router';

import { store } from '../App';

export default {
  go: (path, state) => store.dispatch(push(path, state)),
  replace: (path, state) => store.dispatch(replace(path, state)),
  goBack: () => store.dispatch(goBack()),
  goForward: () => store.dispatch(goForward()),
};
