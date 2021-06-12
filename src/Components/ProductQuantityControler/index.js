import React, { Component } from 'react';
import { connect } from 'react-redux';
// Actions
import ProductsActions from '../../Redux/ActionsAndReducers/Products'
// Bootstrap
import Button from 'react-bootstrap/Button';
// Components
import { FormLayout, FormItem } from '../Form';
import { TextField } from '../Form/Controls';
// Services
import { setIcon } from '../../Services/Utils';

class ProductQuantityControler extends Component {
  remove = id => {
    const { removeProduct } = this.props;

    removeProduct(id);
  }

  subtract = id => {
    const { subtractProduct } = this.props;

    subtractProduct(id);
  }

  update = quantity => {
    const { product, updateProduct } = this.props;

    updateProduct(product.id, +quantity || 1);
  }

  add = () => {
    const { product, addProduct } = this.props;

    addProduct(product);
  }

  get products() {
    const { productsStore } = this.props;

    return productsStore.products;
  }

  get value() {
    const { product } = this.props;
    const { products } = this;

    const productIndex = products.findIndex(item => item.id === product.id);

    return products[productIndex]?.quantity || 0;
  }

  render() {
    const { productsStore, product } = this.props;
    console.log('this.value', this.value)
    return(
      <FormLayout>
        <FormItem fullWidth>
          <div className='d-flex justify-content-between align-items-center'>
            <TextField
              type='number'
              min={1}
              value={this.value}
              onChange={this.update}
            />
            {/* To Do : add + - buttons to add or subtract */}
          </div>
        </FormItem>
      </FormLayout>
    );
  }
}

const mapStateToProps = store => ({
  productsStore: store.products || {},
});

const mapDispatchToProps = dispatch => ({
  addProduct: product => dispatch(ProductsActions.add(product)),
  subtractProduct: id => dispatch(ProductsActions.subtract(id)),
  removeProduct: id => dispatch(ProductsActions.remove(id)),
  updateProduct: (id, quantity) => dispatch(ProductsActions.update(id, quantity)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductQuantityControler);
