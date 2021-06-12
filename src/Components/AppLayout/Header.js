import React, { Component } from 'react';
import { connect } from 'react-redux';
// Actions
import AuthActions from '../../Redux/ActionsAndReducers/Auth';
// Bootstrap
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
// Services
import Navigate from '../../Services/Navigate';
import { setIcon } from '../../Services/Utils';

class Header extends Component {
  toggleUser = () => {
    const { forceLogin, forceLogout } = this.props;

    if(this.isAuthenticated) {
      forceLogout();
    } else {
      forceLogin({
        name: 'Mohammed Saber',
        image: 'https://b.thumbs.redditmedia.com/_ONCOVYp7iV0QCBBOkXZCENCM_lMnw2KFTjG9NustHI.jpg'  
      });
    }
  }

  get isAuthenticated() {
    const { auth } = this.props;
    return auth?.isAuthenticated || false;
  }

  render() {
    const { isAuthenticated } = this;
    const { auth } = this.props;
    const { profile } = auth || {};

    console.log('isAuthenticated', this.isAuthenticated);
    return (
      <Navbar className='header-navbar' collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand  onClick={() => Navigate.go('/')}>
          {isAuthenticated && (
            <img
              alt=""
              src={`${profile.image}`}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
          )}
          {' '}{isAuthenticated ? profile.name : 'Demo'}
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav" >
          {isAuthenticated && (
            <Nav className="mr-auto">
              <NavDropdown 
                title={(
                  <div className='d-flex align-items-baseline'>
                    <img 
                      className="thumbnail-image mr-1"
                      width={30}
                      height={30} 
                      src={setIcon('cart', 'png')} 
                      alt="user pic"
                    />
                  </div>
                )} 
                id="collasible-shop-dropdown"
              >
                <NavDropdown.Item onClick={() => Navigate.go('/checkout')}>Selected Products</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
          <Nav>
            <Button
              onClick={this.toggleUser}
              variant={`${isAuthenticated ? 'danger' : 'success'}`}
            >
              {isAuthenticated ? 'Logout' : 'Login'}
            </Button>
          </Nav>
        </Navbar.Collapse>

      </Navbar>
    )
  }
}

const mapStateToProps = store => ({
  auth: store.auth || {}
});

const mapDispatchToProps = dispatch => ({
  forceLogin: data => dispatch(AuthActions.getProfileSuccess(data)),
  forceLogout: () => dispatch(AuthActions.reset())
});


export default connect(mapStateToProps, mapDispatchToProps)(Header);