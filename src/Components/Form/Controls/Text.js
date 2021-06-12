import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Forms
import Form from 'react-bootstrap/Form';
// React Bootsrtap
import InputGroup from 'react-bootstrap/InputGroup';


/**
 * Text Component
 * @augments {Component<Props, State>}
 */

class Text extends Component {
  onInputChange(value) {
    const { onChange, name } = this.props;

    if (name) {
      onChange(name, value);
    } else {
      onChange(value);
    }
  }

  render() {

    const {
      id,
      name,
      error,
      type,
      size,
      label,
      value,
      min,
      onClick,
      required,
      disabled,
      maxLength,
      noGutters,
      placeholder,
      helperText,
      className,
      multi,
      wrapperClassName,
    } = this.props;

    return (
      <Form.Group className={`${noGutters ? 'mb-0' : ''}`}>
        {label && (
          <Form.Label
            className={`font-weight-bold ${error ? 'text-danger' : ''}`}
            htmlFor={`${name}-${id}-input`}
          >
            {label}
            {required && <span className={'required-star'}>*</span>}
          </Form.Label>
        )}

        <InputGroup className={wrapperClassName}>

          <Form.Control
            type={type}
            size={size}
            onClick={onClick}
            readOnly={disabled}
            maxLength={maxLength}
            multiple
            as={multi ? 'textarea' : 'input'}
            placeholder={placeholder}
            className={`form-text-field ${className}`}
            ref={ref => (this.ref = ref)}
            onChange={e => this.onInputChange(e.target.value)}
            value={value}
            min={min}
          />
        </InputGroup>

        {helperText && (
          <Form.Text
            className={`${helperText || error ? 'text-danger' : ''}`}
          >
            {helperText}
          </Form.Text>
        )}
      </Form.Group>
    );
  }
}

Text.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  helperText: PropTypes.string,
  placeholder: PropTypes.string,
  wrapperClassName: PropTypes.string,

  min: PropTypes.number,
  maxLength: PropTypes.number,

  disabled: PropTypes.bool,
  required: PropTypes.bool,
  noGutters: PropTypes.bool,
  adornmentBg: PropTypes.bool,
  multi: PropTypes.bool,

  size: PropTypes.oneOf(['sm', 'lg']),

  onClick: PropTypes.func,
  onChange: PropTypes.func,
};

Text.defaultProps = {
  type: 'text',
  label: '',
  value: '',
  placeholder: '',
  id: '',
  className: '',
  wrapperClassName: '',

  noGutters: true,
  disabled: false,
  required: false,
  multi: false,

  onClick() { },
  onChange() { },
};

export { Text };
