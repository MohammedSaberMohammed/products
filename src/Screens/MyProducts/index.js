import React, { Component } from 'react';
import { connect } from 'react-redux';
// Bootstrap
import Button from 'react-bootstrap/Button';
// Configs
import { FireBaseDB } from '../../Configs';
// Components
import EmptyPlaceholder from '../../Components/EmptyPlaceholder';
import { FormLayout, FormItem, FormContainer } from '../../Components/Form';
import { TextField } from '../../Components/Form/Controls';
import CardLayout from '../../Components/Card';

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
    const { layout } = this.props;

    this.setState({ firebaseLoading: true }, () => {
      FireBaseDB
      .collection('orders')
      .where('email', '==', layout.userEmail)
      .get()
      .then(snapshot => {
        const products = [];

        snapshot.docs.forEach(doc => {
          const row = doc.data();

          if(Object.keys(row).length) {

            products.push(row);
          }
        });
        console.log('products', products);
        this.setState({ products });
      })
      .catch(err => console.log(err.message))
      .finally(() => this.setState({ firebaseLoading: false }))
    });
  };

  get isDummyFetch() {
    const { layout } = this.props;

    return layout.integrationMethod === 'Dummy'; 
  }

  render() {
    const { products, firebaseLoading } = this.state;
    const singleUserData = products[0] || {};

    return (
      <FormLayout loading={firebaseLoading}>
        {(!products.length || this.isDummyFetch) ? 
          <EmptyPlaceholder width={50} text={this.isDummyFetch ? 'You have to enable Integrate As Firebase ( Mode ) from homepage' : 'No Previous Products Saved Yet'} />
          :
          <>
            <FormItem fullWidth>
              <h4 className='theme_color'>Saved Products</h4>
            </FormItem>

            <FormItem md={4} lg={4} xl={4}>
              <TextField
                label={'Email Address'}
                value={singleUserData.email} 
                disabled
              />
            </FormItem>

            <FormItem md={4} lg={4} xl={4}>
              <TextField
                label={'Address'}
                value={singleUserData.address} 
                disabled
              />
            </FormItem>

            <FormItem md={4} lg={4} xl={4}>
              <TextField
                label={'Phone Number'}
                value={singleUserData.phoneNumber.code + singleUserData.phoneNumber.number} 
                disabled
              />
            </FormItem>

            {singleUserData.products.map(product => (
              <FormItem key={product.id} lg={4} xl={4}>
                <CardLayout 
                  imgSrc={product.image}
                  title={product.title}
                  cardStyles='white_background'
                  // footer={(
                  //   <>
                  //     <Button 
                  //       onClick={() => Navigate.go(`/products/product/${product.id}`)}
                  //       variant={'outline-secondary'}
                  //       className='mr-2'
                  //     >
                  //       Details
                  //     </Button>

                  //     <Button 
                  //       onClick={e => this.handleAddToCart(e, product)}
                  //       variant={this.isProductAddedToCart(product.id) ? 'outline-danger' : 'outline-primary'}
                  //     >
                  //       {this.isProductAddedToCart(product.id) ? 'Remove From Cart' : 'Add To Cart'}
                  //     </Button>
                  //     </>
                  //   )}
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
    )
  }
}

const mapStateToProps = store => ({
  layout: store?.layout
});

export default connect(mapStateToProps)(ProductList);
