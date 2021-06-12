import React, { Component } from 'react';
import { connect } from 'react-redux';
// Actions
import LayoutActions from '../../Redux/ActionsAndReducers/Layout'
import ProductsActions from '../../Redux/ActionsAndReducers/Products'
// Bootstrap
import Button from 'react-bootstrap/Button';
// Services
import Navigate from '../../Services/Navigate';
// Components
import EmptyPlaceholder from '../../Components/EmptyPlaceholder';
import { FormLayout, FormItem } from '../../Components/Form';
import ProductQuantityControler from '../../Components/ProductQuantityControler';
import Card from '../../Components/Card';
import { setIcon } from '../../Services/Utils';

class ProductList extends Component {
  toggleView = () => {
    const { toggleView } = this.props;

    toggleView();
  }

  removeProduct = id => {
    const { removeProduct } = this.props;

    removeProduct(id);
  }

  render() {
    const { products } = this.props.productsStore;
    const { isListView } = this.props;

    return (
      <FormLayout>
        {!products.length ? 
          <EmptyPlaceholder width={50} text={'No Selected Products Found'} />
          :
          <>
            <FormItem fullWidth>
              <div className='mb-3 d-flex justify-content-between align-items-center'>
                <h4 className='theme_color m-0'>Cart</h4>
                <Button
                  variant='success'
                  onClick={this.toggleView}
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
              <FormItem fullWidth={isListView} lg={3} xl={3}>
                <Card 
                  key={product.id}
                  imgSrc={product.image}
                  title={product.title}
                  cardStyles='white_background'
                  footer={(
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
