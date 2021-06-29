import {
  getCountryCodeAndStrippedNumber,
  getValidCountryCode,
  getValidPhoneNumber,
  isValidNumber,
  isValidNumberWithCountry
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

describe('Personal Details Validation Util tests', () => {});
