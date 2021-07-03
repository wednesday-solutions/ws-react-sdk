import React from 'react';
import parsePhoneNumberFromString from 'libphonenumber-js';

import { FormattedMessage } from 'react-intl';

const FULLNAME_VALIDATION_RULE = /^[a-z\s]+$/i;
const ADDRESS_VALIDATION_RULE = /^[a-zA-Z0-9\s,.'-]{3,}$/;
const LICENSE_NUMBER_VALIDATION_RULE = /^[a-zA-Z0-9]*$/;
const NUMBER_VALIDATION_RULE = /^[0-9]*$/;
const YEARS_OF_EXPERIENCE_RULE = /^[0-9]{2}$/;
const PASSWORD_VALIDATION_RULE = /^(?=.*[\d])(?=.*[!$#])((?=.*[A-Z]))[a-zA-Z0-9!@#$%^&*]{8,}$/;
const OTP_RULE = /^[0-9]{6}$/;
const MOBILE_RULE = /^[0-9]{5,13}$/;
const COUNTRY_CODE_RULE = /^\+?\d+$/;

const createRule = (ruleName, ruleValue, message) => ({
  [ruleName]: ruleValue,
  message: message.trim().length > 0 ? <FormattedMessage id={message} /> : 'Invalid Input Value'
});

const required = message => createRule('required', true, message);
const pattern = (pattern, message) => createRule('pattern', pattern, message);
const validator = (validationHandler, message) => createRule('validator', validationHandler, message);
export const isValidNumber = (value, code) => {
  try {
    const number = parsePhoneNumberFromString(`+${code + value.replace('-', '')}`);

    return number.isValid();
  } catch (e) {
    return false;
  }
};

export const getCountryCodeAndStrippedNumber = phoneNumber => {
  let countryCode = '';
  let strippedNumber = '';
  try {
    const number = parsePhoneNumberFromString(phoneNumber);
    countryCode = number.countryCallingCode;
    strippedNumber = number.nationalNumber;
  } catch (err) {}
  return { countryCode, strippedNumber };
};
export const isValidNumberWithCountry = (countryCode, phoneNumber) => {
  try {
    if (phoneNumber?.length && phoneNumber[0] === '0') {
      return false;
    }
    const number = parsePhoneNumberFromString(countryCode + phoneNumber);
    return number.isValid();
  } catch (e) {
    return false;
  }
};
export const handlePhoneNumberValidation = (rule, value, callback, countryCode) => {
  if (value && !isValidNumber(value, countryCode)) {
    callback(new Error('Invalid error'));
  }
  callback();
};
export const handlePhoneNumberValidationWithCountry = (rule, value, callback) => {
  if (value && !isValidNumberWithCountry(value)) {
    callback(new Error('Invalid error'));
  }
  callback();
};
export const isFullnameValid = (requiredMsgId, invalidFullnameMsgId) => [
  required(requiredMsgId),
  pattern(FULLNAME_VALIDATION_RULE, invalidFullnameMsgId)
];

export const isAddressValid = (requiredMsgId, invalidMsgId) => [
  required(requiredMsgId),
  pattern(ADDRESS_VALIDATION_RULE, invalidMsgId)
];
export const isLicenseNumberValid = (requiredMsgId, invalidMsgId) => [
  required(requiredMsgId),
  pattern(LICENSE_NUMBER_VALIDATION_RULE, invalidMsgId)
];
export const isNumberValid = (requiredMsgId, invalidMsgId) => [
  required(requiredMsgId),
  pattern(NUMBER_VALIDATION_RULE, invalidMsgId)
];
export const isYearsOfExpValid = (requiredMsgId, invalidMsgId) => [pattern(YEARS_OF_EXPERIENCE_RULE, invalidMsgId)];
export const isMobileValidWithCountry = (requiredMsgId, invalidMobileMsgId) => [
  required(requiredMsgId),
  validator((rule, value, callback) => {
    handlePhoneNumberValidationWithCountry(rule, value, callback);
  }, invalidMobileMsgId)
];

export const type = (type, message) => createRule('type', type, message);

export const isEmailValid = (requiredMsgId, invalidEmailMsgId) => [
  required(requiredMsgId),
  type('email', invalidEmailMsgId)
];

export const isPasswordValid = (requiredMsgId, invalidPasswordMsgId) => [
  required(requiredMsgId),
  pattern(PASSWORD_VALIDATION_RULE, invalidPasswordMsgId)
];

export const isRequired = requiredMsgId => [required(requiredMsgId)];

export const isFullNameValid = (requiredMsgId, invalidFullNameMsgId) => [
  required(requiredMsgId),
  pattern(FULLNAME_VALIDATION_RULE, invalidFullNameMsgId)
];

export const isOTPValid = (rquiredMsg, invalidMsg) => [required(rquiredMsg), pattern(OTP_RULE, invalidMsg)];

export const isMobileValid = (requiredMsgId, invalidMobileMsgId) => [
  required(requiredMsgId),
  pattern(MOBILE_RULE, invalidMobileMsgId)
];

export const isCountryCodeValid = (requiredMsgId, invalidCountryCodeMsgId) => [
  required(requiredMsgId),
  pattern(COUNTRY_CODE_RULE, invalidCountryCodeMsgId)
];

// while using this validation make sure that your password field has a name of 'password'
export const doPasswordsMatch = (getFieldValue, requiredMsgId, invalidPasswordMsgId) => [
  required(requiredMsgId),
  validator((_rule, value, callback) => {
    if (!value || getFieldValue('password') === value) {
      callback();
    }
    callback(new Error('Password does not match'));
  }, invalidPasswordMsgId)
];

export const getValidCountryCode = countryCode => {
  let cc = countryCode;
  if (countryCode && countryCode[0] !== '+') {
    cc = '+' + countryCode;
  }
  return cc;
};
export const getValidPhoneNumber = (countryCode, mobile) => {
  let p = mobile;
  if (mobile && mobile[0] === '0') {
    p = mobile.substr(1, mobile.length);
  }
  return getValidCountryCode(countryCode) + p;
};

export default {
  type,
  isRequired,
  isOTPValid,
  isEmailValid,
  isValidNumber,
  isNumberValid,
  isMobileValid,
  isAddressValid,
  isPasswordValid,
  isFullnameValid,
  isFullNameValid,
  doPasswordsMatch,
  isYearsOfExpValid,
  isCountryCodeValid,
  getValidPhoneNumber,
  getValidCountryCode,
  isLicenseNumberValid,
  isMobileValidWithCountry,
  isValidNumberWithCountry,
  handlePhoneNumberValidation,
  getCountryCodeAndStrippedNumber,
  handlePhoneNumberValidationWithCountry
};
