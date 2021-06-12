import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// React bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
// Loading
import ActivityIndicator from '../ActivityIndicator';

class FormContainer extends Component {
  render() {
    const {
      fluid,
      className,
      children,
      rowClassName,
      loading,
      blurryLoader,
      loaderMessage
    } = this.props;

    return (
      <Container fluid={fluid} className={`${className} position-relative`}>
        {(loading || blurryLoader) && (
          <div className={'attached-loader'}>
            <ActivityIndicator descriptiveText={loaderMessage} />
          </div>
        )}

        <Row
          style={{ minWidth: '100%' }}
          className={classNames(`${rowClassName}`, {
            'invisible-display': blurryLoader,
            'loading-overlay-body': loading,
          })}
        >

          {children}
        </Row>
      </Container>
    );
  }
}

FormContainer.propTypes = {
  loaderMessage: PropTypes.string,
  className: PropTypes.string,
  rowClassName: PropTypes.string,

  fluid: PropTypes.bool,
  loading: PropTypes.bool,
  blurryLoader: PropTypes.bool,
  
  children: PropTypes.any,
};

FormContainer.defaultProps = {
  fluid: true,
  loading: false,
  blurryLoader: false,
  className: '',
  rowClassName: '',
  loaderMessage: '',
};

export { FormContainer };
