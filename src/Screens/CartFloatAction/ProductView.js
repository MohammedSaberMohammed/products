import React, { Component } from 'react'
import { FormItem, FormContainer } from '../../Components/Form';
// Bootstrap
import Button from 'react-bootstrap/Button';

import ProductQuantityControler from '../../Components/ProductQuantityControler';

class ProductView extends Component {
  render() {
    const { product, onDelete } = this.props;

    return (
      <FormItem spacing='2' gutterBottom={2} fullWidth className='theme-container '>
        <FormContainer rowClassName={'m-0'} className={'p-0'}>
          <FormItem spacing={1} md={3} xl={3} lg={3}>
              <img 
                src={product.image} 
                alt="product" 
                class="img-thumbnail " 
                id='drawer-image'
                style={{
                  width: '100%',
                  borderRadius: 30
                }}
              />
          </FormItem>

          <FormItem spacing={1}  md={9} xl={9} lg={9}>
            {/* Details */}
            <div className='d-flex align-items-baseline'>
              <h6 className='theme_color m-0 mr-2'>Quantity: </h6>
              <div>
                <ProductQuantityControler product={product} spacing={0}/>
              </div>
            </div>

            <div className='d-flex align-items-center mb-2'>
              <h6 className='theme_color m-0 mr-2'>Price per item:</h6>
              <p className='m-0 mr-2'>{product.price}</p>
              <span className='currency'>$</span>
            </div>

            <div className='d-flex align-items-center mb-2'>
              <h6 className='theme_color m-0 mr-2'>Total price:</h6>
              <p className='m-0 mr-2'>{product.price * product.quantity}</p>
              <span className='currency'>$</span>
            </div>

            <Button 
              onClick={onDelete}
              block
              variant={'outline-secondary'}
            >
              Delete from cart
            </Button>
          </FormItem>
          
        </FormContainer>

      </FormItem>
    )
  }
}

export default ProductView;
