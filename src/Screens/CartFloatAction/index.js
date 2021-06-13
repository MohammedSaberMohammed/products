import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
// Actions
import ProductsActions from '../../Redux/ActionsAndReducers/Products'

// Bootstrap
import Button from 'react-bootstrap/Button';
// Services
import { setIcon } from '../../Services/Utils';
import Navigate from '../../Services/Navigate';
// Components
import ProductView from './ProductView';
import EmptyPlaceholder from '../../Components/EmptyPlaceholder';
import Modal from '../../Components/Modal';
import { FormLayout } from '../../Components/Form';


class CartFloatAction extends Component {
  state = {
    openDialog: false
  };

  openDialog = () => {
    
    this.setState({ openDialog: true });
  }

  removeProduct = id => {
    const { removeProduct } = this.props;

    removeProduct(id);
  }

  closeDialog = () => {
    this.setState({ openDialog: false })
  }

  get totaPrice() {
    const { products } = this.props.productsStore;

    return products.reduce((result, { quantity, price }) => result += price * quantity, 0)
  }

  renderContent = () => {
    const { isAuthenticated } = this.props;
    const { openDialog } = this.state;
    const { products } = this.props.productsStore;

    return(
      <div>
        <Modal
          title={'Shopping Cart'}
          show={openDialog}
          handleClose={this.closeDialog}
          backdrop
          // animation={false}
          dialogClassName={'drawer-modal'}
          actions={!!products.length &&
            <Button
              block
              onClick={() => {
                this.closeDialog()
                Navigate.go(`/products/contact`)
              }}
              variant={'danger'}
            >
              Total price is: {this.totaPrice} $ Order Now!
            </Button>
          }
        >
          <FormLayout>
            {!products.length && <EmptyPlaceholder width={50} text={'No Products Selected Yet'} />}
            {products.map((product, i) => <ProductView onDelete={() => this.removeProduct(product.id)} product={product} key={i} /> )}
          </FormLayout>
        </Modal>

        {isAuthenticated && (
          <button 
            onClick={this.openDialog}
            className='d-flex justify-content-center align-items-center theme_primary_button fab-icon light-shadow'
          >
            <img 
              className="thumbnail-image mr-1"
              width={30}
              height={30} 
              src={setIcon('Icons/cart')} 
              alt="user pic"
            />
          </button>
        )}
      </div>
    );
  }

  render() {
    const renderer = document.getElementById('shopping-cart');
    
    return ReactDOM.createPortal(this.renderContent(), renderer);
  }
}

const mapStateToProps = store => ({
  isAuthenticated: store.auth.isAuthenticated || false,
  productsStore: store.products || {},
});

const mapDispatchToProps = dispatch => ({
  removeProduct: id => dispatch(ProductsActions.remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartFloatAction);