import React, { Component } from 'react';
import { connect } from 'react-redux';
// Actions
import LayoutActions from '../../../Redux/ActionsAndReducers/Layout'
import ProductsActions from '../../../Redux/ActionsAndReducers/Products'
// Bootstrap
import Button from 'react-bootstrap/Button';
// Services
import Navigate from '../../../Services/Navigate';
// Components
import Entity from '../../../Components/Entity';
import EmptyPlaceholder from '../../../Components/EmptyPlaceholder';
import { FormLayout, FormItem, FormContainer } from '../../../Components/Form';
import CardLayout from '../../../Components/Card';

class ProductList extends Component {
  state = {
    products: [],
  };

  componentDidMount() {
    this.productsEntity.get();
  }

  onEntityReceived = products => this.setState({ products });

  toggleView = () => {
    const { toggleView } = this.props;

    toggleView();
  }

  handleAddToCart = (e, product) => {
    e.stopPropagation();
    
    const { addProduct, removeProduct } = this.props;
    const isAddedBefore = this.isProductAddedToCart(product.id);

    if(isAddedBefore) {
      removeProduct(product.id);
    } else {
      addProduct(product);
    }
  }

  isProductAddedToCart = id => {
    const { products } = this.props.productsStore;
    // check if
    return products.findIndex(product => product.id === id) > -1;
  }

  render() {
    const { products } = this.state;
    const { isListView } = this.props;

    return (
      <Entity 
        storeId='Products-List'
        entityRef={ref => this.productsEntity = ref}
        onEntityReceived={this.onEntityReceived}
        render={store => (
          <FormLayout loading={store.loading}>
            {!products.length ? 
              <EmptyPlaceholder width={50} text={'No Products Found'} />
              :
              <>
                <FormItem fullWidth>
                  <h4 className='theme_color'>All Products</h4>
                  <Button 
                    onClick={this.toggleView}
                  >
                    {isListView ? 'List' : 'Grid'}
                  </Button>
                </FormItem>

                {products.map(product => (
                  <FormItem fullWidth={isListView} lg={4} xl={4}>
                    <CardLayout 
                      key={product.id}
                      imgSrc={product.image}
                      title={product.title}
                      cardStyles='white_background'
                      footer={(
                        <>
                        <Button 
                          onClick={() => Navigate.go(`/product/${product.id}`)}
                          variant={'outline-secondary'}
                          className='mr-2'
                        >
                          Details
                        </Button>

                        <Button 
                          onClick={e => this.handleAddToCart(e, product)}
                          variant={this.isProductAddedToCart(product.id) ? 'outline-danger' : 'outline-primary'}
                        >
                          {this.isProductAddedToCart(product.id) ? 'Remove From Cart' : 'Add To Cart'}
                        </Button>
                        </>
                      )}
                    >
                      <FormContainer>
                        <FormItem 
                          fullWidth 
                          spacing={0} 
                          className='d-flex align-items-center'
                        >
                          <h6 className='theme_color m-0 mr-2'>Category:</h6>
                          <p className='m-0 mr-2'>{product.category}</p>
                        </FormItem>

                        <FormItem 
                          fullWidth 
                          spacing={0} 
                          className='d-flex align-items-center'
                        >
                          <h6 className='theme_color m-0 mr-2'>Price:</h6>
                          <p className='m-0 mr-2'>{product.price}</p>
                          <span className='currency'>$</span>
                        </FormItem>
                      </FormContainer>
                    </CardLayout>
                  </FormItem>
                ))}
              </>
            }
          </FormLayout>
        )}
      />
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
