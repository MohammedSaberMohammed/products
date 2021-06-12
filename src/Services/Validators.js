import template from 'lodash/template';
import reduce from 'lodash/reduce';
import isNaN from 'lodash/isNaN';
import isEmpty from 'lodash/isEmpty';
import { isObject, convertBytesToMega } from './Utils';
import Strings from './Strings';
import { map } from 'lodash';
import IBAN from 'iban';

export class Validator {
  constructor({ key, message, validator }) {
    this.key = key;
    this.message = message;
    this.validator = validator;
  }

  validate(value, field, form) {
    const { key, message } = this;
    const validation = this.validator(value, field, form);
    const { validators } = field;
    let valid = validation;
    const isRequiredExists = validators.find(item => item.key === 'REQUIRED');

    if (!isRequiredExists && !value) {
      valid = true;
    }

    return {
      key,
      message,
      valid,
    };
  }
}

export const isRequired = (message = Strings.validationRequired) => new Validator({
  key: 'REQUIRED',
  message,
  validator: value => (value === null || value === undefined || isNaN(value)) ? false : `${value}`.trim().length > 0,
});

export const isObjectRequired = (message = Strings.validationRequired) => new Validator({
  key: 'OBJECT_REQUIRED',
  message,
  validator: value => !isEmpty(value),
});

export const saudiPhoneNumber = (message = Strings.saudiPhoneNumberValidation) => new Validator({
  key: 'SAUDI_PHONE_NUMBER',
  message,
  validator: value => new RegExp(/^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/).test(value),
});

export const saudiID = (message = Strings.saudiIdentityNumberValidation) => new Validator({
  key: 'SAUDI_IDENTITY_NUMBER',
  message,
  validator: value => validateSaudiID(value),
});

export const passwordValidator = (message = Strings.passwordValidation) => new Validator({
  key: 'PASSWORD',
  message,
  validator: value => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/.test(value),
});

export const minLength = (length, message = Strings.validationMinLength) => new Validator({
  key: 'MIN_LENGTH',
  message: template(message)({ length }),
  validator: value => `${value}`.length >= length,
});

export const maxLength = (length, message = Strings.validationMaxLength) => new Validator({
  key: 'MAX_LENGTH',
  message: template(message)({ length }),
  validator: value => `${value}`.length <= length,
});

export const exactLength = (length, message = Strings.validationExactLength) => new Validator({
  key: 'EXACT_LENGTH',
  message: template(message)({ length }),
  validator: value => `${value}`.length === length,
});

export const minWords = (count, message = Strings.validationMinWords) => new Validator({
  key: 'MIN_WORDS',
  message: template(message)({ count }),
  validator: value => `${value}`.trim().split(' ').length >= count,
});

export const maxWords = (count, message = Strings.validationMaxWords) => new Validator({
  key: 'MAX_WORDS',
  message: template(message)({ count }),
  validator: value => `${value}`.trim().split(' ').length <= count,
});

export const startsWith = (char, message = Strings.validationStartsWith) => new Validator({
  key: 'STARTS_WITH',
  message: template(message)({ char }),
  validator: value => `${value}`.startsWith(char),
});

export const startsWithOr = (chars, message = Strings.validationStartsWithOr) => new Validator({
  key: 'STARTS_WITH_OR',
  message: template(message)({ char: chars.toString() }),
  validator: value => {
    let valid = false;

    chars.map(item => {
      if (value.startsWith(item)) {
        valid = true;
      }
    });

    return valid;
  },
});

export const onlyNumbers = (message = Strings.validationOnlyNumbers) => new Validator({
  key: 'ONLY_NUMBERS',
  message,
  validator: value => /^\d*$/ig.test(`${value}`),
});

export const maxNumbers = (maxNumber, message = Strings.validationMaxValue) => new Validator({
  key: 'MAX_NUMBERS',
  message: template(message)({ maxNumber }),
  validator: value => Number(value) <= maxNumber,
});

export const minNumbers = (minNumber, message = Strings.validationMinValue) => new Validator({
  key: 'MIN_NUMBERS',
  message: template(message)({ minNumber }),
  validator: value => Number(value) >= minNumber,
});

export const onlyLetters = (message = Strings.validationOnlyLetters) => new Validator({
  key: 'ONLY_LETTERS',
  message,
  validator: value => /^([A-Za-z]|[\u0600-\u06FF\s])*$/ig.test(`${value}`),
});

export const onlyArabicAndNumbers = (message = Strings.validationOnlyLetters) => new Validator({
  key: 'ONLY_LETTERS',
  message,
  validator: value => /^([0-9]|[\u0600-\u06FF\s])*$/ig.test(`${value}`),
});

export const onlyEnglish = (message = Strings.validationOnlyEnglish) => new Validator({
  key: 'ONLY_ENGLISH',
  message,
  validator: value => /^[a-zA-Z\s]*$/ig.test(`${value}`),
});

export const onlyEnglishWithChar = (chars = '', message = Strings.validationOnlyEnglish) => new Validator({
  key: 'ONLY_ENGLISH_WITH_CHAR',
  message,
  validator: value => {
    const charList = Array.from(chars);
    let charValidator = '';

    if (!isEmpty(charList)) {
      map(charList, (char, index) => {
        if ([']', '-', '^'].indexOf(char) > -1) {
          charList[index] = `\\${char}`;
        }
      });

      charValidator = charList.join('');
    }

    return new RegExp(`^[a-zA-Z${charValidator}\\s]*$`, 'ig').test(`${value}`);
  },
});

export const onlyArabic = (message = Strings.validationOnlyArabic) => new Validator({
  key: 'ONLY_ARABIC',
  message,
  validator: value => /^[\u0600-\u06FF\s]*$/ig.test(`${value}`),
});

export const noArabic = (message = Strings.validationNoArabic) => new Validator({
  key: 'NO_ARABIC',
  message,
  validator: value => !/[\u0600-\u06FF]/ig.test(`${value}`),
});

export const onlyAlphanumeric = (message = Strings.validationOnlyAlphanumeric) => new Validator({
  key: 'ONLY_ALPHANUMERIC',
  message,
  validator: value => /^[a-zA-Z0-9\s]*$/ig.test(`${value}`),
});

export const hasSpecialChars = (message = Strings.validationOnlySpecialChars) => new Validator({
  key: 'HAS_SPECIAL_CHARACTERS',
  message,
  validator: value => /[$#!@&]/ig.test(`${value}`),
});

export const matches = (otherValue, message = Strings.validationEquals) => new Validator({
  key: 'MATCHES',
  message,
  validator: value => value === otherValue()
});

export const emailAddress = (message = Strings.emailValidation) => new Validator({
  key: 'EMAIL',
  message,
  validator: value => /^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,64}$/ig.test(`${value}`),
});

export const hasUpperCase = (message = Strings.validationHasUpperCase) => new Validator({
  key: 'HAS_UPPER_CASE',
  message,
  validator: value => /[A-Z]/.test(`${value}`),
});

export const hasLowerCase = (message = Strings.validationHasLowerCase) => new Validator({
  key: 'HAS_LOWER_CASE',
  message,
  validator: value => /[a-z]/.test(`${value}`),
});

export const hasDigit = (message = Strings.validationHasDigit) => new Validator({
  key: 'HAS_Digit',
  message,
  validator: value => /[0-9]/.test(`${value}`),
});

export const hasDigitWithoutZero = (message = Strings.validationHasDigit) => new Validator({
  key: 'HAS_Digit',
  message,
  validator: value => /[1-9]/.test(`${value}`),
});

export const numberWithoutZeroStart = (message = Strings.validationNumberWithoutZeroStart) => new Validator({
  key: 'NUMBER_WITHOUT_ZERO_START',
  message,
  validator: value => new RegExp('^(?!00)([1-9][0-9]*)$').test(`${value}`),
});

export const isVerified = (message = Strings.validationIsVerified) => new Validator({
  key: 'IS_VERIFIED',
  message,
  validator: (value, field) => field.verified === true,
});

export const arrayMaxLength = (maxLength, message = Strings.collectionMaxLength) => new Validator({
  key: 'ARRAY_MAX_LENGTH',
  message: template(message)({ maxLength }),
  validator: value => value.length <= maxLength,
});

export const arrayMinLength = (minLength, message = Strings.collectionMinLength) => new Validator({
  key: 'ARRAY_MIN_LENGTH',
  message: template(message)({ minLength }),
  validator: value => value.length >= minLength,
});

export const arrayExactLength = (length, message = Strings.collectionExactLength) => new Validator({
  key: 'ARRAY_EXACT_LENGTH',
  message: template(message)({ length }),
  validator: value => value.length === length,
});

export const allChildrenAreValid = (message = Strings.validationAllChildrenValid) => new Validator({
  key: 'ALL_CHILDREN_VALID',
  message,
  validator: value => {
    const isValidField = (field_, value_) => {
      const selfIsValid = field_.errors.length === 0;

      if (Array.isArray(value_) || isObject(value_)) {
        const childrenAreValid = reduce(value_, (allValid, child) => allValid && isValidField(child, child.value), true);

        return selfIsValid && childrenAreValid;
      }

      return selfIsValid;
    };

    const isValid = reduce(value, (allValid, child) => allValid && isValidField(child, child.value), true);

    return isValid;
  }
});

export const iban = (message = Strings.validationIban) => new Validator({
  key: 'IABN',
  message,
  validator: value => IBAN.isValid(value),
});

export const maxFilesSizeInMega = (size = 20, message = Strings.validationMaximumAllowedFileSizes, sizeProp = 'size') => new Validator({
  key: 'MAX_FILES_SIZE_IN_MEGA',
  message: template(message)({ size }),
  validator: (value = []) => {

    let isValid = true;

    if (value) {
      value.reduce((sum, currentFile) => {
        if (isValid) {
          const totalSizeInBytes = sum + currentFile[sizeProp];
          const isMaxSizeExceeded = size < convertBytesToMega(totalSizeInBytes);

          if (isMaxSizeExceeded) {
            isValid = false;
          }

          return sum + currentFile[sizeProp];
        }
      }, 0);
    }
    return isValid;
  }
});

// ====================== Helpers =================
const validateSaudiID = id => {
  id = id.trim();
  let sum = 0;
  const type = id.substr(0, 1);

  if (isNaN(parseInt(id)) || (id.length !== 10) || (type !== '2' && type !== '1')) {
    return false;
  }

  for (let i = 0; i < 10; i++) {
    if (i % 2 === 0) {
      const ZFOdd = String(`00${String(Number(id.substr(i, 1)) * 2)}`).slice(-2);
      sum += Number(ZFOdd.substr(0, 1)) + Number(ZFOdd.substr(1, 1));
    } else {
      sum += Number(id.substr(i, 1));
    }

  }

  return sum % 10 === 0;
};

export const isValidObjectValues = (message = Strings.objectValuesNotCorrectValidation) => new Validator({
  key: 'IS_VALID_OBJECT_VALUES',
  message,
  validator: value => {
    let isValid = true;
    
    if (!isObject(value) || isEmpty(value)) { 
      isValid = false;
    }
    if (isObject(value) || !isEmpty(value)) { 
      Object.entries(value).forEach(([_, value]) => {
        if (!value) isValid = false;
      });
    }

    return isValid;
  },
});
