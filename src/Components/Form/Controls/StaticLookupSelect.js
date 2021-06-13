import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Lodash
import find from 'lodash/find';
// Select
import Select, { components } from 'react-select';
// Bootstrap
import Form from 'react-bootstrap/Form';
// Services
import { setIcon } from '../../../Services/Utils';

// React Bootsrtap
// import InputGroup from 'react-bootstrap/InputGroup';

const CaretDownIcon = props => {
  const { selectProps } = props;

  return (
    <img
      alt={'indicator'}
      style={{
        // transition: 'all .3s ease-out',
        transform: `rotate(${selectProps.menuIsOpen ? 180 : 0}deg)`,
      }}
      width="20"
      src={setIcon('Icons/toggle-down')}
    />
  );
};

/**
 * StaticLookupSelect Component
 * @augments {Component<Props, State>}
 */
class StaticLookupSelect extends Component {
  handleChangeSelection = selectedValue => {
    const { name, onChange, optionValue } = this.props;
    const fieldValue = selectedValue ? selectedValue[optionValue] : '';

    if (name) {
      return onChange(name, fieldValue);
    }

    return onChange(fieldValue);
  };

  dropdownIndicator = props => {
    return (
      <components.DropdownIndicator {...props}>
        <CaretDownIcon {...props} />
      </components.DropdownIndicator>
    );
  };

  ValueContainer = ({ children, ...props }) => {
    const { rightAdornment } = this.props;
    return (
      components.ValueContainer && (
        <components.ValueContainer {...props}>
          {!!children && rightAdornment && (
            <div style={{ minWidth: 35, textAlign: 'center' }}>
              {rightAdornment}
            </div>
          )}
          {children}
        </components.ValueContainer>
      )
    );
  };

  get value() {
    const { value, lookup, optionValue } = this.props;

    const defaultValue = find(lookup, [`${optionValue}`, value]);

    return defaultValue || null;
  }

  get selectStyles() {
    const { rightAdornment, styles } = this.props;
    const { controle, placeholder, singleValue } = styles || {};

    return {
      menu: provided => ({
        ...provided,
        zIndex: 200,
      }),
      option: (provided, { isSelected }) => {
        return {
          ...provided,
          transition: 'all .3s ease-out',
          borderBottom: '1px dotted #BA0D2F',
          color: isSelected ? '#fff' : '#BA0D2F',
          backgroundColor: isSelected ? '#BA0D2F' : '#fff',
          fontWeight: isSelected ? 600 : 'normal',

          padding: 20,
          cursor: 'pointer',
          ':hover': {
            background: isSelected ? '#BA0D2F' : '#d4355478',
            color: '#fff',
            fontWeight: 600,
          },
        };
      },
      control: provided => ({
        // none of react-select's styles are passed to <Control />
        ...provided,
        height: '45px',
        borderRadius: '30px',
        paddingRight: !rightAdornment ? 15 : 0,
        border: 'solid 1px #ba0d2f',
        boxShadow: 'unset',
        cursor: 'pointer',
        ':hover': {
          borderColor: '#ba0d2f',
        },
        ':focus': {
          height: '45px',
        },
        ...controle,
      }),
      placeholder: provided => ({
        ...provided,
        ...placeholder,
      }),
      singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return {
          ...provided,
          opacity,
          transition,
          ...singleValue,
        };
      },
      input: () => ({
        paddingRight: 0,
      }),
      // singleValue: () => ({
      //   paddingRight: 0,
      // })
      // valueContainer: base => ({
      //   ...base,
      // paddingLeft: 40,
      // })
    };
  }

  render() {
    const {
      rtl,
      name,
      error,
      multi,
      label,
      lookup,
      loading,
      required,
      disabled,
      clearable,
      helperText,
      searchable,
      placeholder,
      optionLabel,
      optionValue,
      menuPlacement,
      noOptionsMessage,
      hideSelectedOptions,
      rightAdornment
    } = this.props;

    return (
      <Form.Group
        className={'mb-0'}
        controlId={`${name}-Static-Lookup-Select`}
      >
        {label && (
          <Form.Label className={`font-weight-bold ${error ? 'text-danger' : ''}`}>
            {label}
            {required && <span className={'required-star'}>*</span>}
          </Form.Label>
        )}

        <Select
          id={`${name}-Static-Lookup-Select`}
          name={name}
          isRtl={rtl}
          isMulti={multi}
          options={lookup}
          isLoading={loading}
          value={this.value}
          isDisabled={disabled}
          styles={this.selectStyles}
          // inputValue={} ----> searchInputValue
          isClearable={clearable}
          placeholder={placeholder}
          isSearchable={searchable}
          menuPlacement={menuPlacement}
          getOptionLabel={option => `${option[optionLabel]}`}
          getOptionValue={option => `${option[optionValue]}`}
          classNamePrefix={'select'}
          className={`static-lookup-select ${rightAdornment ? 'select-right-adornment ' : ''}`}
          onChange={this.handleChangeSelection}
          hideSelectedOptions={hideSelectedOptions}
          // user
          noOptionsMessage={() => noOptionsMessage}
          // override components
          components={{
            DropdownIndicator: this.dropdownIndicator,
            ValueContainer: this.ValueContainer,
          }}
        />

        <Form.Text className={'text-danger'}>{helperText}</Form.Text>
      </Form.Group>
    );
  }
}

StaticLookupSelect.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.string,
  optionLabel: PropTypes.string,
  optionValue: PropTypes.string,
  placeholder: PropTypes.string,
  noOptionsMessage: PropTypes.string,

  rightAdornment: PropTypes.node,

  rtl: PropTypes.bool,
  error: PropTypes.bool,
  multi: PropTypes.bool,
  loading: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  clearable: PropTypes.bool,
  menuIsOpen: PropTypes.bool,
  searchable: PropTypes.bool,
  adornmentBg: PropTypes.bool,
  hideSelectedOptions: PropTypes.bool,

  lookup: PropTypes.array,

  selectProps: PropTypes.object,
  styles: PropTypes.shape({
    controle: PropTypes.object,
    placeholder: PropTypes.object,
    singleValue: PropTypes.object,
  }),

  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]), // Based on multi value
  menuPlacement: PropTypes.oneOf(['auto', 'bottom', 'top']),

  onChange: PropTypes.func,
};

StaticLookupSelect.defaultProps = {
  helperText: '',
  optionLabel: 'name',
  optionValue: 'id',
  menuPlacement: 'auto',
  noOptionsMessage: 'No Choises Found',

  rtl: false,
  error: false,
  multi: false,
  loading: false,
  disabled: false,
  required: false,
  clearable: true,
  searchable: true,
  hideSelectedOptions: false,

  selectProps: {},

  onChange() { },
};

export { StaticLookupSelect };
