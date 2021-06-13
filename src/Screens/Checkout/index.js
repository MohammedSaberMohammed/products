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
import { FavoriteViews } from '../../Services/StaticLookups';
import { StaticLookupSelectField } from '../../Components/Form/Controls';
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

  updateView = (name, value) => {
    const { updateFavoriteView } = this.props;
    console.log(value)
    updateFavoriteView(value);
  }

  removeProduct = id => {
    const { removeProduct } = this.props;

    removeProduct(id);
  }

  get totaPrice() {
    const { products } = this.props.productsStore;

    return products.reduce((result, { quantity, price }) => result += price * quantity, 0)
  }

  get isListView() {
    const { selectedView } = this.props;

    return selectedView === 'List';
  }

  render() {
    const { products } = this.props.productsStore;
    const { selectedView } = this.props;
    const { openDialog } = this.state;
    const { isListView } = this;

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
                Navigate.go(`/products/contact`)
              }}
              variant={'danger'}
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

              <FormItem spacing={1}>
                <StaticLookupSelectField
                  name='favoriteView'
                  label={'View As'}
                  lookup={FavoriteViews}
                  onChange={this.updateView}
                  value={selectedView}
                  clearable={false}
                />
              </FormItem>
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
                      onClick={() => Navigate.go(`/products/product/${product.id}`)}
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
  productsStore: store.products || {},
  selectedView: store?.layout?.selectedView
});

const mapDispatchToProps = dispatch => ({
  updateFavoriteView: view => dispatch(LayoutActions.updateView(view)),
  addProduct: product => dispatch(ProductsActions.add(product)),
  removeProduct: id => dispatch(ProductsActions.remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
