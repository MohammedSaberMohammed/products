import React, { Component } from 'react';
// Bootstrap
import Button from 'react-bootstrap/Button';
import Navigate from '../../Services/Navigate';
class PageNotFound extends Component {

  render() {
    return (
      <div className='theme-container white_background background-card-shadow mt-5'>
        <h3>Page Not Found</h3>
        <Button variant='outline-primary' onClick={() => Navigate.go('/products')}>Home</Button>
      </div>
    )
  }
}

export default PageNotFound;
