import React from 'react';
import PropTypes from 'prop-types';

import { FormItem } from '../Form';

function EmptyPlaceholder({ text, width }) {
  return (
    <FormItem fullWidth className="d-flex justify-content-center align-items-center m-t-50 text-center">
      <p className={`m-0 w-${width} theme-container theme-container-text-wrapper`}>{text}</p>
    </FormItem>
  )
}

EmptyPlaceholder.propTypes = {
  text: PropTypes.string,
  width: PropTypes.number,
};

EmptyPlaceholder.defaultProps = {
  text: 'Not Found',
  width: 100
};

export default EmptyPlaceholder;