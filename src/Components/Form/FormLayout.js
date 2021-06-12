import React from 'react';
import PropTypes from 'prop-types';
// React bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
// Loading
import ActivityIndicator from '../ActivityIndicator';

function conditionalClass(condition, className) {
  return condition ? className : '';
}

function FormLayout({
  id,
  fluid,
  children,
  className,
  loading,
  loaderMessage,
  disableRowMargin,
  rowClassName,
}) {
  return (
    <Container id={id} fluid={fluid} className={`general-form-wrapper position-relative ${className}`}>
      {loading && (
        <div className={'attached-loader'}>
          <ActivityIndicator descriptiveText={loaderMessage} />
        </div>
      )}

      <Row
        className={`general-form-wrapper-row ${rowClassName} ${loading ? 'loading-overlay-body' : ''} ${conditionalClass(
          disableRowMargin,
          'mx-0'
        )}`}
      >
        {children}
      </Row>
    </Container>
  );
}

FormLayout.propTypes = {
  loading: PropTypes.bool,

  fluid: PropTypes.oneOf([true, false, 'sm', 'md', 'lg', 'xl']),

  children: PropTypes.any,

  className: PropTypes.string,
  rowClassName: PropTypes.string,
};

FormLayout.defaultProps = {
  loading: false,
  fluid: true,

  className: '',
  rowClassName: '',
};

export { FormLayout };
