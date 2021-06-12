import React from 'react';
import PropTypes from 'prop-types';
// React bootstrap
import Col from 'react-bootstrap/Col';

function FormItem({
  xs,
  sm,
  md,
  lg,
  xl,
  id,
  style,
  spacing,
  children,
  className,
  fullWidth,
  gutterBottom,
}) {
  const gridProps = () => {
    const grid = {
      xs, sm, md, lg, xl 
    };

    // Handle Full Width
    if (fullWidth) {
      grid.xs = 12;
      grid.sm = 12;
      grid.md = 12;
      grid.lg = 12;
      grid.xl = 12;
    }

    return grid;
  };

  return (
    <Col
      id={id}
      style={style}
      {...gridProps()}
      className={`px-0 p-${spacing} mb-${gutterBottom} ${className}`}
    >
      {children}
    </Col>
  );
}

FormItem.propTypes = {
  children: PropTypes.any,

  style: PropTypes.object,

  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  xl: PropTypes.number,
  spacing: PropTypes.number,
  gutterBottom: PropTypes.number,

  id: PropTypes.string,
  className: PropTypes.string,

  fullWidth: PropTypes.bool,
};

FormItem.defaultProps = {
  fullWidth: false,

  style: {},

  xs: 12,
  sm: 12,
  md: 6,
  lg: 4,
  xl: 3,

  spacing: 3,
  gutterBottom: 2,

  id: '',
  className: '',
};

export { FormItem };
