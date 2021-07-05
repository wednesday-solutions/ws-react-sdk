import { DEFAULT_COUNTRY_CODE, RULE_NAMES } from '../constants';

describe('constants test', () => {
  it('should ensure default country code is not null', () => {
    expect(DEFAULT_COUNTRY_CODE).not.toBeNull();
  });
  it('should ensure that default country code value', () => {
    const defaultCountryCode = '971';
    expect(DEFAULT_COUNTRY_CODE).toBe(defaultCountryCode);
  });
  it('should ensure that rules name have values', () => {
    const objectLength = Object.keys(RULE_NAMES).length;
    expect(objectLength).toBe(4);
  });
});
