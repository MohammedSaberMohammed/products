import React from 'react';

// Anonymous
import ProductsList from '../Screens/Products/List';
import ProductDetails from '../Screens/Products/Details';
import PageNotFound from '../Screens/PageNotFound';
// logedin Routes
import Checkout from '../Screens/Checkout';
import Contact from '../Screens/Contact';
import MyProducts from '../Screens/MyProducts';
/*  Route Model */
/**
 * path: string
 * component: React.Component
 * routeProps: Object -----> To override route props
 * redirectPath: String ----> To redirect to specific location [ instead of fallbackPath ]
 * showRouteIf: Boolean ----> To decide when to show/hide the route
*/
export const authorizedStructure = {
  fallbackPath: '/products',
  routes: [
    { path: '/products/checkout', component: <Checkout /> },
    { path: '/products/contact', component: <Contact /> },
    { path: '/products/mine', component: <MyProducts /> },
  ]
};

export const anonymousStructure = {
  routes: [
    { path: '/products', component: <ProductsList /> },
    { path: '/products/product/:id', component: <ProductDetails /> },
    { path: '/products/404', component: <PageNotFound /> },
  ]
};
