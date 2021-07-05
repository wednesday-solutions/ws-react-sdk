/**
 *
 * Tests for OtpInput
 *
 */

import React from 'react';
import { renderWithIntl } from '@utils/testUtils';
import OtpInput from '../index';
import { fireEvent } from '@testing-library/dom';

describe('<OtpInput />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<OtpInput />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 OtpInput component', () => {
    const { getAllByTestId } = renderWithIntl(<OtpInput />);
    expect(getAllByTestId('otp-input').length).toBe(1);
  });
  it('should ensure that if no is verified it should call updatePhoneNumberRequest  ', () => {
    const number = '9991232319';
    const { getByTestId } = renderWithIntl(<OtpInput verifyNumber={true} phone={number} />);
    expect(fireEvent.click(getByTestId('t'))).toBeTruthy();
  });
  it('should ensure that if no is not verified it should call resendConfirmationCode', () => {
    const number = '9991232319';
    const { getByTestId } = renderWithIntl(<OtpInput verifyNumber={false} phone={number} />);
    expect(fireEvent.click(getByTestId('t'))).toBeTruthy();
  });
});
