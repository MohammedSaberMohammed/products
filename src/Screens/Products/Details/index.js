import React, { Component } from 'react';

import get from 'lodash/get';

// Components
import Actions from './Actions';
import Entity from '../../../Components/Entity';
import EmptyPlaceholder from '../../../Components/EmptyPlaceholder';
import { FormLayout, FormItem, FormContainer } from '../../../Components/Form';

class ProductList extends Component {
  state = {
    details: {}
  };

  componentDidMount() {
    this.productDetailsEntity.get({ productId: this.productId });
  }

  onEntityReceived = details => this.setState({ details });

  get productId() {
    const { match } = this.props;

    return get(match, 'params.id', 0);
  }

  render() {
    const { details } = this.state;
    const isValidDetails = Object.keys(details).length > 0;

    return (
      <Entity 
        storeId='Single-Product-Details'
        entityRef={ref => this.productDetailsEntity = ref}
        onEntityReceived={this.onEntityReceived}
        render={store => (
          <FormLayout loading={store.loading}>
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

export default ProductList
