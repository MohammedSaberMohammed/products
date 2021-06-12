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
  update: [ 'id', 'quantity' ],

  reset: null,
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
    products[productIndex].quantity += 1;
  } else {
    products.push({ ...product, quantity: 1 });
  }

  return state.merge({ products });
};

export const subtractProduct = (state, { id }) => {
  const products = cloneDeep(state.products);
  const productIndex = products.findIndex(item => item.id === id);

  if(productIndex > -1) {
    products[productIndex].quantity -= 1;
  }

  return state.merge({ products });
};

export const removeProduct = (state, { id }) => state.merge({ 
  products: state.products.filter(product => product.id !== id) 
});

export const updateProduct = (state, { id, quantity }) => {
  const products = cloneDeep(state.products);
  const productIndex = products.findIndex(item => item.id === id);

  if(productIndex > -1) {
    products[productIndex].quantity = quantity;
  }

  return state.merge({ products });
};

export const reset = () => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD]: addProduct,
  [Types.SUBTRACT]: subtractProduct,
  [Types.REMOVE]: removeProduct,
  [Types.UPDATE]: updateProduct,

  [Types.RESET]: reset,
});
