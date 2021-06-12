import React, { Component } from "react";
import { connect } from "react-redux";
// Actions
import ProductsActions from '../../Redux/ActionsAndReducers/Products';
// Lodash
import map from "lodash/map";
import set from "lodash/set";
import reduce from "lodash/reduce";
import isEmpty from "lodash/isEmpty";
import filter from "lodash/filter";
import get from "lodash/get";
// Components
import { FormLayout, FormItem } from '../../Components/Form';
import { TextField, PhoneNumberField } from '../../Components/Form/Controls';
// Services
import { isRequired, emailAddress, isValidObjectValues } from "../../Services/Validators";
import { ToastConfig } from "../../Services/Utils";
import Navigate from "../../Services/Navigate";
// React bootstrap 
import Button from "react-bootstrap/Button";
// Notifications
import { toast } from 'react-toastify';

const FormFields = {
  EMAIL: 'email',
  ADDRESS: 'address',
  PHONENUMBER: 'phoneNumber'
}

class Contact extends Component {
  state = {
    // in order to trigger fields validation after click submit
    formValidatedWithSubmit: false,
    form: {
      [FormFields.EMAIL]: {
        value: '',
        UIOnly: false,
        errors: []
      },
      [FormFields.ADDRESS]: {
        value: '',
        UIOnly: false,
        errors: []
      },
      [FormFields.PHONENUMBER]: {
        value: {},
        UIOnly: false,
        errors: []
      },
    },
  };

  onSubmit() {
    const { formValidatedWithSubmit } = this.state;

    if(!formValidatedWithSubmit) {
      this.setState({ formValidatedWithSubmit: true })
    }

    if(this.isFormValid) {
      const { resetProducts } = this.props;
      
      resetProducts();

      setTimeout(() => {
        toast.success('Submitted Successfully', ToastConfig());

        Navigate.go('/home')
      })
    }
  }
  // Implemented but not used
  updateFormValues(values) {
    const { form } = this.state;
    let newFormState = {};

    if(!isEmpty(values)) {
      map(form, (field, fieldName) => {
        newFormState[fieldName] = {
          ...field,
          value: values[fieldName] || field.value
        }
      });

      this.setState({ form: newFormState })
    }
  }

  updateFieldValue(name, value) {
    const { form, formValidatedWithSubmit } = this.state;
    const modifiedForm = {
      ...form,
      [name]: {
        ...form[name],
        value
      }
    };

    this.setState({ form: modifiedForm }, () => {
      // triger form validation
      if(formValidatedWithSubmit) {
        return this.isFormValid;
      }
    });
  }

  getFieldValue(name) {
    const { form } = this.state;
    const target = form[name];

    if(target) {
      return target.value;
    }
  }

  getHelperText(fieldName) {
    const { form } = this.state;

    if(form[fieldName]) {
      return get(form, `${fieldName}.errors.0.message`, null);
    }
  }

  get isFormValid() {
    let isFormValid= true;
    const { form } = this.state;
    const formValues = this.formValues;
    const { 
      EMAIL,
      ADDRESS,
      PHONENUMBER
    } = FormFields;
    // Get All Field Validators
    const formValidators = {
      [EMAIL]: [ isRequired(formValues[EMAIL]), emailAddress(formValues[EMAIL]) ],
      [ADDRESS]: [ isRequired(formValues[ADDRESS]) ],
      [PHONENUMBER]: [ isRequired(formValues[PHONENUMBER]), isValidObjectValues(formValues[PHONENUMBER]) ],
    };

    // Append Error To Form to [ Forbid Submit And Show HelperText ]
    map(formValidators, (fieldValidators, fieldName) => {
      // Append Only Errors
      map(fieldValidators, (validator, index) => {
        const errors = filter(fieldValidators, [ 'isValid', false ]);
        // collect all error for the field
        if(!validator.isValid) {  
          // check if there is an [ invalid input --> to stop submission ]
            isFormValid = false;
        }

        // push Field Errors to the state
        if(index === fieldValidators.length - 1) {
          const modifiedForm = set(form, fieldName, {
            ...form[fieldName],
            errors
          });
          this.setState({ form: modifiedForm });
        }
      })
    })

    return isFormValid;
  }

  get formValues() {
    return reduce(this.state.form, (_formValues, field, name) => {
      if(field.UIOnly) {
        return _formValues;
      }

      return set(_formValues, name, field.value);
    }, {});
  }
  
  render() {

    return (
        <FormLayout 
          className='mt-3 p-3 theme-container white_background background-card-shadow'
        >
          <FormItem fullWidth>
            <TextField
              size={"lg"}
              name={FormFields.EMAIL}
              label={'Email Address'}
              value={this.getFieldValue(FormFields.EMAIL)}
              helperText={this.getHelperText(FormFields.EMAIL)}
              placeholder={"name@example.com"}
              onChange={(fieldName, value) => this.updateFieldValue(fieldName, value)}
            />
          </FormItem>

          <FormItem fullWidth>
            <TextField
              size={"lg"}
              placeholder={"1234 Main St"}
              name={FormFields.ADDRESS}
              label={'Address'}
              value={this.getFieldValue(FormFields.ADDRESS)}
              helperText={this.getHelperText(FormFields.ADDRESS)} 
              onChange={(fieldName, value) => this.updateFieldValue(fieldName, value)}
            />
          </FormItem>

          <FormItem fullWidth>
            <PhoneNumberField
              size={"lg"}
              placeholder={"10xxxxxxx"}
              name={FormFields.PHONENUMBER}
              label={'Phone number'}
              value={this.getFieldValue(FormFields.PHONENUMBER)}
              helperText={this.getHelperText(FormFields.PHONENUMBER)} 
              onChange={(fieldName, value) => this.updateFieldValue(fieldName, value)}
            />
          </FormItem>
          
          <FormItem className={'d-flex justify-content-end'} fullWidth>
            <Button
              variant={'outline-danger'}
              onClick={() => this.onSubmit()}
            >
              {'Submit'}
            </Button>
          </FormItem>
        </FormLayout>
    );
  }
}

Contact.propTypes = {};

Contact.defaultProps = {};

const mapDispatchToProps = dispatch => ({
  resetProducts: () => dispatch(ProductsActions.reset())
});

export default connect(null, mapDispatchToProps)(Contact);