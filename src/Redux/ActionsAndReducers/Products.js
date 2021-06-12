import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

import cloneDeep from 'lodash/cloneDeep';

/* ------------- Initial State ------------- */
const INITIAL_STATE = Immutable({
  products: [],
});

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  add: [ 'product' ],
  subtract: [ 'id' ],
  remove: [ 'id' ],
}, {
  prefix: 'Products/',
});

export const ProductsTypes = Types;
export default Creators;

/* ------------- Reducers ------------- */
export const addProduct = (state, { product }) => {
  const products = cloneDeep(state.products);
  const productIndex = products.findIndex(item => item.id === product.id);

  if(productIndex > -1) {
    products[productIndex].count += 1;
  } else {
    products.push({ ...product, count: 1 });
  }

  return state.merge({ products });
};

export const subtractProduct = (state, { id }) => {
  const products = cloneDeep(state.products);
  const productIndex = products.findIndex(item => item.id === id);

  if(productIndex > -1) {
    products[productIndex].count -= 1;
  }

  return state.merge({ products });
};

export const removeProduct = (state, { id }) => state.merge({ 
  products: state.products.filter(product => product.id !== id) 
});

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD]: addProduct,
  [Types.SUBTRACT]: subtractProduct,
  [Types.REMOVE]: removeProduct,
});
