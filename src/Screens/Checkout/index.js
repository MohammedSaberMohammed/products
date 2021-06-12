import React, { Component } from 'react';
import { connect } from 'react-redux';
// Actions
import LayoutActions from '../../Redux/ActionsAndReducers/Layout'
import ProductsActions from '../../Redux/ActionsAndReducers/Products'
// Bootstrap
import Button from 'react-bootstrap/Button';
// Services
import Navigate from '../../Services/Navigate';
import { setIcon } from '../../Services/Utils';
// Components
import ProductView from './ProductView';
import EmptyPlaceholder from '../../Components/EmptyPlaceholder';
import { FormLayout, FormItem } from '../../Components/Form';
import ProductQuantityControler from '../../Components/ProductQuantityControler';
import Card from '../../Components/Card';
import Modal from '../../Components/Modal';
class ProductList extends Component {
  state = {
    openDialog: false
  };

  initiateReviewMode = () => {
    this.setState({ openDialog: true })
  }

  closeDialog = () => {
    this.setState({ openDialog: false })
  }

  toggleView = () => {
    const { toggleView } = this.props;

    toggleView();
  }

  removeProduct = id => {
    const { removeProduct } = this.props;

    removeProduct(id);
  }

  get totaPrice() {
    const { products } = this.props.productsStore;

    return products.reduce((result, { quantity, price }) => result += price * quantity, 0)
  }

  render() {
    const { products } = this.props.productsStore;
    const { isListView } = this.props;
    const { openDialog } = this.state;

    return (
      <FormLayout>
        <Modal
          title={'Review Order'}
          show={openDialog}
          handleClose={this.closeDialog}
          backdrop
          actions={
            <Button
              block
              onClick={() => {
                this.closeDialog()
                Navigate.go(`/contact`)
              }}
              variant={'outline-danger'}
            >
              Total price is: {this.totaPrice} $ Order Now!
            </Button>
          }
        >
          <FormLayout>
            {products.map((product, i) => <ProductView product={product} key={i} /> )}
          </FormLayout>
        </Modal>

        {!products.length ? 
          <EmptyPlaceholder width={50} text={'No Selected Products Found'} />
          :
          <>
            <FormItem fullWidth>
              <div className='mb-3 d-flex justify-content-between align-items-center'>
                <h4 className='theme_color m-0'>Cart</h4>
                <Button
                  variant='success'
                  onClick={this.initiateReviewMode}
                >
                  {'Review Order!'}
                </Button>
              </div>
              <Button 
                onClick={this.toggleView}
              >
                {isListView ? 'List' : 'Grid'}
              </Button>
            </FormItem>

            {products.map(product => (
              <FormItem fullWidth={isListView} lg={4} xl={4}>
                <Card 
                  key={product.id}
                  imgSrc={product.image}
                  title={product.title}
                  cardStyles='white_background'
                  footer={(
                    <>
                    <Button 
                      onClick={() => this.removeProduct(product.id)}
                      variant={'outline-danger'}
                      className='mr-2'
                    >
                      <img 
                        src={setIcon('Icons/delete')}
                        width='25'
                        height='30'
                        alt='delete product'
                      />
                    </Button>

                    <Button 
                      onClick={() => Navigate.go(`/product/${product.id}`)}
                      variant={'outline-secondary'}
                      className='mr-2'
                    >
                      Details
                    </Button>
                    </>
                  )}
                >
                  <div className='d-flex align-items-baseline'>
                    <h5 className='theme_color m-0 mr-2'>Quantity: </h5>
                    <div>

                      <ProductQuantityControler product={product} />
                    </div>
                  </div>
                </Card>
              </FormItem>
            ))}
          </>
        }
      </FormLayout>
    )
  }
}

const mapStateToProps = store => ({
  // when finish store part
  productsStore: store.products || {},
  isListView: store?.layout?.isListView || false
});

const mapDispatchToProps = dispatch => ({
  // when finish store part
  toggleView: () => dispatch(LayoutActions.toggleView()),
  addProduct: product => dispatch(ProductsActions.add(product)),
  removeProduct: id => dispatch(ProductsActions.remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
