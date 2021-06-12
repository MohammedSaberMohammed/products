import React, { Component } from 'react'
import { FormItem } from '../../Components/Form';

class ProductView extends Component {
  render() {
    const { product } = this.props;

    return (
      <FormItem spacing='2' gutterBottom={2} fullWidth className='theme-container d-flex'>
        <div className='mr-3' style={{
          height: '100px',
          width: '150px'
        }}>
          <img 
            src={product.image} 
            alt="product" 
            class="img-thumbnail"
            style={{
              borderRadius: 30
            }} 
          />
        </div>
        <div className='flex-grow-1'>
          <div 
            fullWidth 
            spacing={0} 
            className='d-flex align-items-center'
          >
            <h6 className='theme_color m-0 mr-2'>Quantity:</h6>
            <p className='m-0 mr-2'>{product.quantity}</p>
          </div>

          <div 
            fullWidth 
            spacing={0} 
            className='d-flex align-items-center'
          >
            <h6 className='theme_color m-0 mr-2'>Price per item:</h6>
            <p className='m-0 mr-2'>{product.price}</p>
            <span className='currency'>$</span>
          </div>

          <div 
            fullWidth 
            spacing={0} 
            className='d-flex align-items-center'
          >
            <h6 className='theme_color m-0 mr-2'>Total price:</h6>
            <p className='m-0 mr-2'>{product.price * product.quantity}</p>
            <span className='currency'>$</span>
          </div>
        </div>
      </FormItem>
    )
  }
}

export default ProductView;
