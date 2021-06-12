import React, { Component } from 'react';
import { connect } from 'react-redux';
// Lodash
import get from 'lodash/get';
// Bootstrap
import Button from 'react-bootstrap/Button';
// Actions
import ProductsActions from '../../../Redux/ActionsAndReducers/Products';
// Components
import ProductQuantityControler from '../../../Components/ProductQuantityControler';

class Actions extends Component {
  handleAddToCart = () => {
    const { product } = this.props;
    const { addProduct, removeProduct } = this.props;

    if(this.isProductAddedToCart) {
      removeProduct(product.id);
    } else {
      addProduct(product);
    }
  }

  get isProductAddedToCart() {
    const { product: { id } } = this.props;
    const { products } = this.props.productsStore;

    return products.findIndex(product => product.id === id) > -1;
  }

  get isAuthenticated() {
    const { auth } = this.props;

    return get(auth, 'isAuthenticated', false);
  }

  render() {
    const { product } = this.props;

    return (
      <div className='mt-3 theme-container white_background background-card-shadow '>
        <h5 className='theme_color'>Available Actions</h5>

        {!this.isAuthenticated ? 
          <p className='m-0 light-black-color'>You Have to be logged in to take any action</p>
          :  
          <>
            {this.isProductAddedToCart && 
              <div className='d-flex align-items-baseline'>
                <h5 className='theme_color m-0 mr-2'>Required Quantity: </h5>
                <div>

                  <ProductQuantityControler product={product} />
                </div>
              </div>
            }

            <Button 
              onClick={this.handleAddToCart}
              variant={this.isProductAddedToCart ? 'outline-danger' : 'outline-primary'}
            >
              {this.isProductAddedToCart ? 'Remove From Cart' : 'Add To Cart'}
            </Button> 
          </>
        }
      </div>
    );
  }
}

const mapStateToProps = store => ({
  // when finish store part
  productsStore: store.products || {},
  auth: store?.auth || {}
});

const mapDispatchToProps = dispatch => ({
  addProduct: product => dispatch(ProductsActions.add(product)),
  removeProduct: product => dispatch(ProductsActions.remove(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Actions);