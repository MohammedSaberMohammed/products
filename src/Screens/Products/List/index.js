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
import { FormLayout, FormItem } from '../../../Components/Form';
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
    console.log(products)
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
              <EmptyPlaceholder text={'No Products Found'} />
              :
              <>
                <FormItem fullWidth>
                  <h3>All Products</h3>
                  <Button 
                    onClick={this.toggleView}
                  >
                    {isListView ? 'List' : 'Grid'}
                  </Button>
                </FormItem>

                {products.map(product => (
                  <FormItem fullWidth={isListView} lg={3} xl={3}>
                    <CardLayout 
                      key={product.id}
                      imgSrc={product.image}
                      title={product.title}
                      multiSubtitle={[`Category: ${product.category}`, `Price: ${product.price} $`]}
                      cardStyles='cursor-pointer'
                      onClick={() => Navigate.go(`/product/${product.id}`)}
                      footer={(
                        <Button 
                          onClick={e => this.handleAddToCart(e, product)}
                          variant={this.isProductAddedToCart(product.id) ? 'outline-danger' : 'outline-primary'}
                        >
                          {this.isProductAddedToCart(product.id) ? 'Remove From Cart' : 'Add To Cart'}
                        </Button>
                      )}
                    />
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
