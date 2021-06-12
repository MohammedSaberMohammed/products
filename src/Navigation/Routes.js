import React from 'react';

// Anonymous
import ProductsList from '../Screens/Products/List';
import ProductDetails from '../Screens/Products/Details';
import PageNotFound from '../Screens/PageNotFound';
// logedin Routes
import Checkout from '../Screens/Checkout';
import Contact from '../Screens/Contact';
/*  Route Model */
/**
 * path: string
 * component: React.Component
 * routeProps: Object -----> To override route props
 * redirectPath: String ----> To redirect to specific location [ instead of fallbackPath ]
 * showRouteIf: Boolean ----> To decide when to show/hide the route
*/
export const authorizedStructure = {
  fallbackPath: '/home',
  routes: [
    { path: '/checkout', component: <Checkout /> },
    { path: '/contact', component: <Contact /> },
  ]
};

export const anonymousStructure = {
  routes: [
    { path: '/', component: <ProductsList /> },
    { path: '/home', component: <ProductsList /> },
    { path: '/products', component: <ProductsList /> },
    { path: '/product/:id', component: <ProductDetails /> },
    { path: '/404', component: <PageNotFound /> },
  ]
};
