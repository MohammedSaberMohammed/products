import React, {
  useMemo, useEffect, useRef 
} from 'react';
import PropTypes from 'prop-types';
// Lib
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import ar from 'react-phone-input-2/lang/ar.json';
// Bootstrap
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
// Services
import { useMergeState } from '../../../Hooks';

function PhoneNumber({ 
  id,
  name,
  label,
  value,
  error,
  required,
  disabled,
  onChange,
  placeholder,
  onlyCountries,
  excludeCountries,
  preferredCountries,
  helperText,
  inputProps,
  specialLabel,
  initialCountry,
  labelClassName,
  autoFormat,
  enableSearch,
  disableSelection,
  disableCountryCode,
  countryCodeEditable,
  disableSearchIcon,
  inputWrapperClass,
  inputClass,
  buttonClass,
  dropdownClass,
  searchClass,
  codePrefix,
  searchPlaceholder,
  searchNotFoundText,
  rightAdornment
}) {
  const inputWrapperRef = useRef();
  const [state, setState] = useMergeState({
    inputWidth: 0
  });

  useEffect(() => {
    const inputWidth = inputWrapperRef.current.clientWidth;

    setState({ inputWidth });

    window.addEventListener('resize', () => {
      const inputWidth = inputWrapperRef?.current?.clientWidth;
      if (inputWidth !== state.inputWidth) { 

        setState({ inputWidth });
      }
    });
    
    return () => window.removeEventListener('resize');
  }, []);

  const inputParentWidth = useMemo(() => { 
    return inputWrapperRef?.current?.clientWidth;
  }, [state.inputWidth]);
  
  const handlePhoneChange = (value, data, e, formattedValue) => {
    const onlyPhoneValue = value?.slice(data.dialCode.length) || '';

    const phone = {
      code: data.dialCode,
      number: onlyPhoneValue
    };

    if (name) {
      onChange(name, phone);
    } else {
      onChange(phone);
    }
  };

  const inputFormattedValue = useMemo(() => { 
    const { code, number } = value || {};

    return `${code}${number}` || '';
  }, [value]);

  return (
    <Form.Group
      controlId={`${name}-Phone-Number`}
      className={'mb-0'}
      ref={inputWrapperRef}
    >
      {label && (
        <Form.Label className={`font-weight-bold ${error ? 'text-danger' : ''} ${labelClassName}`}>
          {label}
          {required && <span className={'required-star'}>*</span>}
        </Form.Label>
      )}

      <InputGroup>
        {rightAdornment && (
          <InputGroup.Prepend
            className={'adornment-wrapper right-adornment'}
          >
            {rightAdornment}
          </InputGroup.Prepend>
        )}
        <PhoneInput
          country={initialCountry}
          localization={ar}
          value={inputFormattedValue}
          // value={this.state.phone}
          specialLabel={specialLabel}
          onlyCountries={onlyCountries}
          excludeCountries={excludeCountries}
          preferredCountries={preferredCountries}
          onChange={handlePhoneChange}
          placeholder={placeholder}
          searchPlaceholder={searchPlaceholder}
          prefix={codePrefix}
          inputProps={{
            name: `${id}-${name}-phone-number`,
            required: true,
            ...inputProps
          }}
          // Booleans
          disabled={disabled}
          autoFormat={autoFormat}
          enableSearch={enableSearch}
          disableSearchIcon={disableSearchIcon}
          disableDropdown={disableSelection}
          disableCountryCode={disableCountryCode}
          countryCodeEditable={countryCodeEditable}
          searchNotFound={searchNotFoundText}
          // classes
          containerClass={` left-direction ${inputWrapperClass}`}
          inputClass={`phone-number-input ${inputClass}`}
          buttonClass={`flag-dropdown-botton ${buttonClass}`}
          dropdownClass={`flag-dropdown-container ${dropdownClass}`}
          searchClass={searchClass}
          // inline Styles
          dropdownStyle={{
            width: inputParentWidth
          }}
        />
      </InputGroup>

      <Form.Text className={'text-danger'}>
          {helperText}
        </Form.Text>
    </Form.Group>
  );
}

PhoneNumber.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  codePrefix: PropTypes.string,
  inputClass: PropTypes.string,
  searchClass: PropTypes.string,
  buttonClass: PropTypes.string,
  placeholder: PropTypes.string,
  specialLabel: PropTypes.string,
  dropdownClass: PropTypes.string,
  initialCountry: PropTypes.string,
  labelClassName: PropTypes.string,
  inputWrapperClass: PropTypes.string,
  searchPlaceholder: PropTypes.string,
  searchNotFoundText: PropTypes.string,

  helperText: PropTypes.any,

  inputProps: PropTypes.object,

  rightAdornment: PropTypes.node,

  onlyCountries: PropTypes.array, // country codes to be included [ Array of codes ===> ['sa'] ]
  preferredCountries: PropTypes.array, // country codes to be at the top [ Array of codes ===> ['sa'] ]
  excludeCountries: PropTypes.array, // array of country codes to be excluded [ Array of codes ===> ['sa'] ]

  error: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  autoFormat: PropTypes.bool,
  enableSearch: PropTypes.bool,
  disableSelection: PropTypes.bool,
  disableSearchIcon: PropTypes.bool,
  disableCountryCode: PropTypes.bool,
  countryCodeEditable: PropTypes.bool,

  onChange: PropTypes.func
};

PhoneNumber.defaultProps = {
  id: '',
  value: '',
  label: '',
  searchClass: '',
  codePrefix: '+',
  inputClass: '',
  buttonClass: '',
  placeholder: '',
  specialLabel: '',
  dropdownClass: '',
  labelClassName: '',
  initialCountry: 'eg',
  inputWrapperClass: '',
  searchPlaceholder: 'search',
  searchNotFoundText: 'No Search Results Found',

  inputProps: {},

  preferredCountries: ['eg'],

  error: false,
  required: false,
  disabled: false, // disable input and dropdown
  autoFormat: true, // phone formatting
  enableSearch: true, 
  disableSelection: false, // disable dropdown only
  disableCountryCode: false, 
  countryCodeEditable: false, 

  onChange() {}
};

export { PhoneNumber };
