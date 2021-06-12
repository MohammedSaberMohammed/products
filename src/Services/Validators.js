import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';

export const isRequired = (value, message = 'Field is required') => ({
  key: 'REQUIRED',
  message,
  isValid: (value === null || value === undefined) ? false : `${value}`.trim().length > 0,
});

export const emailAddress = (email = '', message = 'Please enter a valid email') => ({
  key: 'EMAIL',
  message,
  isValid: /^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,64}$/ig.test(`${email.trim()}`)
});

export const isValidObjectValues = (value, message = 'Please complete field data') => ({
  key: 'IS_VALID_OBJECT_VALUES',
  message,
  isValid: (() => {
    let isValid = true;
    
    if (!isObject(value) || isEmpty(value)) { 
      isValid = false;
    }
    if (isObject(value) || !isEmpty(value)) { 
      Object.entries(value).forEach(([_, value]) => {
        if (!value) isValid = false;
      });
    }
console.log(value, isValid)
    return isValid;
  })(),
});