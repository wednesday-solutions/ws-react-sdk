import {
  doPasswordsMatch,
  getCountryCodeAndStrippedNumber,
  getValidCountryCode,
  getValidPhoneNumber,
  isValidNumber,
  isValidNumberWithCountry,
  handlePhoneNumberValidation,
  handlePhoneNumberValidationWithCountry,
  isFullNameValid,
  isAddressValid,
  isNumberValid,
  isYearsOfExpValid,
  isMobileValidWithCountry,
  isEmailValid,
  isMobileValid,
  isCountryCodeValid,
  isPasswordValid,
  isOTPValid
} from '../validationUtils';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

describe('Number Validation Utils tests', () => {
  it('should ensure no is valid', () => {
    const value = '9958828795';
    const code = 91;
    expect(isValidNumber(value, code)).toBeTruthy();
  });

  it('should ensure that it throws err when value is number ', () => {
    const value = 9958828795;
    const code = 91;
    expect(isValidNumber(value, code)).toBeFalsy();
  });

  it('should ensure that it throws err when country code is wrong ', () => {
    const value = '9958828795';
    const code = 9111;
    expect(isValidNumberWithCountry(code, value)).toBeFalsy();
  });

  it('should ensure that mobile number starts with 0', () => {
    const value = '09958828795';
    const code = 911;
    expect(isValidNumberWithCountry(code, value)).toBeFalsy();
  });

  it('should ensure that it throws err when phone number is wrong', () => {
    const value = '99588';
    const code = 91;
    expect(isValidNumber(value, code)).toBeFalsy();
  });

  it('should ensure that correct countryCode and stripped number is being passed', () => {
    let countryCode = '';
    let strippedNumber = '';
    const number = getCountryCodeAndStrippedNumber('+919958828795');
    const mockNumber = parsePhoneNumberFromString('+919958828795');
    countryCode = mockNumber.countryCallingCode;
    strippedNumber = mockNumber.nationalNumber;
    expect(number).toEqual({ countryCode, strippedNumber });
  });

  it('handlePhoneNumberValidation and handlePhoneNumberValidationWithCountry callback validation test', () => {
    const value = '9912392123';
    const countryCode = '91';
    const callbackspy = jest.fn();
    handlePhoneNumberValidation(null, value, callbackspy, countryCode);
    expect(callbackspy).toBeCalled();
    handlePhoneNumberValidationWithCountry(null, value, callbackspy);
    expect(callbackspy).toBeCalled();
  });

  it('handlePhoneNumberValidation and handlePhoneNumberValidationWithCountry callback Error validation test', () => {
    const value = '392123';
    const countryCode = '91';
    const callbackspy = jest.fn();
    handlePhoneNumberValidation(null, value, callbackspy, countryCode);
    expect(callbackspy).toBeCalledWith(new Error('Invalid error'));
    handlePhoneNumberValidationWithCountry(null, value, callbackspy);
    expect(callbackspy).toBeCalledWith(new Error('Invalid error'));
  });

  it('should returns country code', () => {
    const countryCode = '256';
    const code = getValidCountryCode(countryCode);
    if (countryCode && countryCode[0] !== '+') {
      expect(code).toBe('+' + countryCode);
    } else {
      expect(code).toBe(countryCode);
    }
  });

  it('should ensure that you get valid number', () => {
    const countryCode = '+256';
    const number = '012142';
    let rawNumber;
    if (number && number[0] === '0') {
      rawNumber = number.substr(1, number.length);
    }
    expect(getValidPhoneNumber(countryCode, number)).toBe(countryCode + rawNumber);
  });
});

describe('Personal Details Validation Util tests', () => {
  it('fullName validation test', () => {
    const validation = isFullNameValid('Valid Name', 'Invalid Name');
    expect(validation).toHaveLength(2);
    expect(validation[0].required).toBeTruthy();
    expect(validation[1].pattern).toStrictEqual(/^[a-z\s]+$/i);
  });

  it('Address validation test', () => {
    const validation = isAddressValid('Valid Address', 'Invalid Address');
    expect(validation).toHaveLength(2);
    expect(validation[0].required).toBeTruthy();
    expect(validation[1].pattern).toStrictEqual(/^[a-zA-Z0-9\s,.'-]{3,}$/);
  });

  it('isNumberValid validation test', () => {
    const validation = isNumberValid('Valid Number', 'Invalid Number');
    expect(validation).toHaveLength(2);
    expect(validation[0].required).toBeTruthy();
    expect(validation[1].pattern).toStrictEqual(/^[0-9]*$/);
  });

  it('isYearsOfExpValid validation test', () => {
    const validation = isYearsOfExpValid('Valid Years Of Experience', 'Invalid Valid Years Of Experience');
    expect(validation).toHaveLength(1);
    expect(validation[0].pattern).toStrictEqual(/^[0-9]{2}$/);
  });

  it('isMobileValidWithCountry validation test', () => {
    const validation = isMobileValidWithCountry('Valid Country Code', 'Invalid Country Code');
    expect(validation).toHaveLength(2);
    expect(validation[0].required).toBeTruthy();
  });

  it('isEmailValid validation test', () => {
    const validation = isEmailValid('Valid emailId', 'Invalid emailId');
    expect(validation).toHaveLength(2);
    expect(validation[0].required).toBeTruthy();
    expect(validation[1].type).toBe('email');
  });

  it('isMobileValid validation test', () => {
    const validation = isMobileValid('Valid MobileNumber', 'Invalid MobileNumber');
    expect(validation).toHaveLength(2);
    expect(validation[0].required).toBeTruthy();
    expect(validation[1].pattern).toStrictEqual(/^[0-9]{5,13}$/);
  });

  it('isCountryCodeValid validation test', () => {
    const validation = isCountryCodeValid('Valid CountryCode', 'Invalid CountryCode');
    expect(validation).toHaveLength(2);
    expect(validation[0].required).toBeTruthy();
    expect(validation[1].pattern).toStrictEqual(/^\+?\d+$/);
  });
});

describe('Password Validation Util tests', () => {
  it('should check required value', () => {
    const getFieldValueMock = input => {
      if (input === 'password') {
        return 'abc';
      }
    };
    expect(doPasswordsMatch(getFieldValueMock, '1', 'Invalid password')).toHaveLength(2);
  });

  it('should call the callback fn if validation passes', () => {
    const callbackspy = jest.fn();
    const getFieldValueMock = input => {
      if (input === 'password') {
        return 'abc';
      }
    };

    const a = doPasswordsMatch(getFieldValueMock, '1', 'Invalid password')[1];
    a.validator(null, 'abc', callbackspy);
    expect(callbackspy).toBeCalled();
    expect(doPasswordsMatch(getFieldValueMock, '1', 'Invalid password')).toHaveLength(2);
  });

  it('isPasswordValid validation test', () => {
    const validation = isPasswordValid('Valid Password', 'Invalid Password');
    expect(validation).toHaveLength(2);
    expect(validation[0].required).toBeTruthy();
    expect(validation[1].pattern).toStrictEqual(/^(?=.*[\d])(?=.*[!$#])((?=.*[A-Z]))[a-zA-Z0-9!@#$%^&*]{8,}$/);
  });

  it('isOTPValid validation test', () => {
    const validation = isOTPValid('Valid Otp', 'Invalid Otp');
    expect(validation).toHaveLength(2);
    expect(validation[0].required).toBeTruthy();
    expect(validation[1].pattern).toStrictEqual(/^[0-9]{6}$/);
  });
});
