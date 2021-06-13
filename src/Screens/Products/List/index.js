import React, { Component } from 'react';
import { connect } from 'react-redux';
// Actions
import LayoutActions from '../../../Redux/ActionsAndReducers/Layout'
import ProductsActions from '../../../Redux/ActionsAndReducers/Products'
// Bootstrap
import Button from 'react-bootstrap/Button';
// Configs
import { FireBaseDB } from '../../../Configs';
// Services
import Navigate from '../../../Services/Navigate';
import { FavoriteViews, IntegrationMethods } from '../../../Services/StaticLookups';
// Components
import Entity from '../../../Components/Entity';
import EmptyPlaceholder from '../../../Components/EmptyPlaceholder';
import { FormLayout, FormItem, FormContainer } from '../../../Components/Form';
import { TextField, StaticLookupSelectField } from '../../../Components/Form/Controls';
import CardLayout from '../../../Components/Card';

class ProductList extends Component {
  state = {
    products: [],
    searchText: '',
    firebaseLoading: false
  };

  componentDidMount() {
    this.get();
  }

  componentDidUpdate(prevProps) {
    const { layout, resetProducts } = this.props;

    if(layout.integrationMethod !== prevProps.layout.integrationMethod) {
      this.setState({ searchText: '', products: [] }, () => {
        // clear store
        resetProducts();
        // Fetch
        this.get();
      })
    }
  }

  get = () => {
    if(this.isDummyFetch) {
      this.productsEntity.get();
    } else {
      // call firebase here
      this.setState({ firebaseLoading: true }, () => {
        FireBaseDB
        .collection('orders')
        .get()
        .then(snapshot => {
          const products = [];

          snapshot.docs.forEach(doc => products.push(doc.data()));

          this.setState({ products });
        })
        .catch(err => console.log(err.message))
        .finally(() => this.setState({ firebaseLoading: false }))
      });
    }
  };

  // resetAndFetch = () 

  onEntityReceived = products => this.setState({ products });

  onFilterProducts = searchText => {
    this.setState({ searchText });
  }

  updateView = (fieldName, value) => {
    const { updateFavoriteView } = this.props;

    updateFavoriteView(value);
  }

  updateIntegrationMethod = (fieldName, value) => {
    const { updateIntegrationMethod } = this.props;
    console.log(value)
    updateIntegrationMethod(value);
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

  get isListView() {
    const { layout } = this.props;

    return layout.selectedView === 'List';
  }

  get isDummyFetch() {
    const { layout } = this.props;

    return layout.integrationMethod === 'Dummy'; 
  }

  get products() {
    const { products, searchText } = this.state;

    if(!searchText) {
      return products;
    }

    return products.filter(({ title }) => title.includes(searchText));
  }

  render() {
    const { layout } = this.props;
    const { products, isListView } = this;
    const { searchText, firebaseLoading } = this.state;

    const { selectedView, integrationMethod } = layout || {};

    return (
      <Entity 
        storeId='Products-List'
        entityRef={ref => this.productsEntity = ref}
        onEntityReceived={this.onEntityReceived}
        render={store => (
          <FormLayout loading={store.loading || firebaseLoading}>
            {(!products.length && !searchText) ? 
              <EmptyPlaceholder width={50} text={'No Products Found'} />
              :
              <>
                <FormItem fullWidth>
                  <h4 className='theme_color'>All Products</h4>

                  <FormContainer className='p-0'>
                    <FormItem lg={4} xl={4}>
                      <StaticLookupSelectField
                        name='favoriteView'
                        label={'View As'}
                        lookup={FavoriteViews}
                        onChange={this.updateView}
                        value={selectedView}
                        clearable={false}
                      />
                    </FormItem>

                    <FormItem lg={4} xl={4}>
                      <StaticLookupSelectField
                        name='integrationMethod'
                        label={'Integrate As'}
                        lookup={IntegrationMethods}
                        onChange={this.updateIntegrationMethod}
                        value={integrationMethod}
                        clearable={false}
                      />
                    </FormItem>

                    <FormItem lg={4} xl={4}>
                      <TextField 
                        label={'Search By Name'}
                        placeholder='product name'
                        onChange={this.onFilterProducts}
                        value={searchText}
                      />
                    </FormItem>
                  </FormContainer> 
                </FormItem>

                {products.map(product => (
                  <FormItem key={product.id} fullWidth={isListView} lg={4} xl={4}>
                    <CardLayout 
                      imgSrc={product.image}
                      title={product.title}
                      cardStyles='white_background'
                      footer={(
                        <>
                          <Button 
                            onClick={() => Navigate.go(`/products/product/${product.id}`)}
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
  productsStore: store.products || {},
  layout: store?.layout
});

const mapDispatchToProps = dispatch => ({
  updateFavoriteView: view => dispatch(LayoutActions.updateView(view)),
  updateIntegrationMethod: method => dispatch(LayoutActions.updateIntegrationMethod(method)),
  addProduct: product => dispatch(ProductsActions.add(product)),
  removeProduct: id => dispatch(ProductsActions.remove(id)),
  resetProducts: () => dispatch(ProductsActions.reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
