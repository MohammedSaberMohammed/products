import React from 'react';
// Store
import { Provider } from 'react-redux';
import createStore from './Redux';
//  Global Notification Wrapper
import { ToastContainer } from 'react-toastify';

// Components
import AppNavigation from './Navigation';
import CartFloatAction from './Screens/CartFloatAction';
// Styles
import './Sass/main.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore();

function App() {
  return (
    <Provider store={store}>
      <ToastContainer />

      <CartFloatAction />
      
      <AppNavigation />
    </Provider>
  );
}

export default App;
export { store };