import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Components
import Header from './Header';
// React bootstrap
import Container from 'react-bootstrap/Container';

class AppLayout extends Component {
  render() {
    const { fullWidth, children } = this.props;

    return (
      <div className={'app-layout'}>

        <Container
          fluid={fullWidth}
          className={'p-0'}
        >
          <Header />
          {children}
        </Container>

      </div>
    );
  }
}

AppLayout.propTypes = {
  fullWidth: PropTypes.any,

  children: PropTypes.any
};

AppLayout.defaultProps = {
  fullWidth: false
};

export default AppLayout;
