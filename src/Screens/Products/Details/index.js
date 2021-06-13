import React, { Component } from 'react';
import { connect } from 'react-redux';
// Configs
import { FireBaseDB } from '../../../Configs';

import get from 'lodash/get';

// Components
import Actions from './Actions';
import Entity from '../../../Components/Entity';
import EmptyPlaceholder from '../../../Components/EmptyPlaceholder';
import { FormLayout, FormItem, FormContainer } from '../../../Components/Form';

class ProductList extends Component {
  state = {
    details: {},
    firebaseLoading: false
  };

  componentDidMount() {
    if(this.isDummyFetch) {
      this.productDetailsEntity.get({ productId: this.productId });
    } else {
      this.firebaseFetch();
    }
  }

  onEntityReceived = details => this.setState({ details });

  firebaseFetch() {
    this.setState({ firebaseLoading: true }, () => {
      FireBaseDB
      .collection('products')
      .where('id', '==', +this.productId)
      .get()
      .then(snapshot => {
        const products = [];

        snapshot.docs.forEach(doc => {
          const row = doc.data();
          console.log('row', row)
          if(Object.keys(row).length) {

            products.push(row);
          }
        });
        console.log('products', products);
        // assuming there is only 1 record
        this.setState({ details: products[0] });
      })
      .catch(err => console.log(err.message))
      .finally(() => this.setState({ firebaseLoading: false }))
    });
  }

  get isDummyFetch() {
    const { layout } = this.props;

    return layout.integrationMethod === 'Dummy'; 
  }

  get productId() {
    const { match } = this.props;

    return get(match, 'params.id', 0);
  }

  render() {
    const { details, firebaseLoading } = this.state;
    console.log(details)
    const isValidDetails = !firebaseLoading ? Object.keys(details).length > 0 : false;

    return (
      <Entity 
        storeId='Single-Product-Details'
        entityRef={ref => this.productDetailsEntity = ref}
        onEntityReceived={this.onEntityReceived}
        render={store => (
          <FormLayout loading={store.loading || firebaseLoading}>
            {!isValidDetails ? 
              <EmptyPlaceholder width={50} text={'No Details Found'} />
              :
              <>
                {/* Title */}
                <FormItem fullWidth>
                  <h3 className='theme_color font-weight-bold'>{details.title}</h3>
                </FormItem>
                {/* Image */}
                <FormItem md={4} lg={5} xl={5}>
                  <div 
                    className='white_background background-card-shadow image-container'
                    style={{
                      backgroundImage: `url(${details.image})`
                    }}
                  />
                </FormItem>
                {/* Details */}
                <FormItem md={8} lg={7} xl={7}>
                  <div className='theme-container white_background background-card-shadow image-container'>
                    {/* <h5 className='theme_color'>General Info:</h5> */}

                    <FormContainer>
                      <FormItem 
                        fullWidth 
                        spacing={0} 
                        className='d-flex align-items-center'
                      >
                        <h6 className='theme_color m-0 mr-2'>Category:</h6>
                        <p className='m-0 mr-2 light-black-color'>{details.category}</p>
                      </FormItem>

                      <FormItem 
                        fullWidth 
                        spacing={0} 
                        className='d-flex align-items-center'
                      >
                        <h6 className='theme_color m-0 mr-2'>Price:</h6>
                        <p className='m-0 mr-2 light-black-color'>{details.price}</p>
                        <span className='currency'>$</span>
                      </FormItem>

                      <FormItem 
                        fullWidth 
                        spacing={0} 
                        // className='d-flex align-items-center'
                      >
                        <h6 className='theme_color m-0 mr-2'>Description:</h6>
                        <p className='m-0 mr-2 px-3 light-black-color'>{details.description}</p>
                        {/* <span className='currency'>$</span> */}
                      </FormItem>
                    </FormContainer>
                    
                  </div>
                
                  
                  <Actions product={details} />
                </FormItem>
              </>
            }
          </FormLayout>
        )}
      />
    )
  }
}

const mapStateToProps = store => ({
  layout: store?.layout
});

export default connect(mapStateToProps)(ProductList);
