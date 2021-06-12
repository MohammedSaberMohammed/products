import React from 'react';
import PropTypes from 'prop-types';

import { FormItem } from '../Form';

function EmptyPlaceholder({ text }) {
  return (
    <FormItem fullWidth className="d-flex justify-content-center align-items-center m-t-50 text-center">
      <p className='m-0'>{text}</p>
    </FormItem>
  )
}

EmptyPlaceholder.propTypes = {
  text: PropTypes.string
};

EmptyPlaceholder.defaultProps = {
  text: 'Not Found'
};

export default EmptyPlaceholder;