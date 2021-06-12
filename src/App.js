import React from 'react';
// Store
import { Provider } from 'react-redux';
import createStore from './Redux';
// Components
import AppNavigation from './Navigation';
// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sass/main.scss';

const store = createStore();

function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}

export default App;
export { store };