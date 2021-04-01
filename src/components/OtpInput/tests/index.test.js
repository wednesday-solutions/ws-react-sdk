/**
 *
 * Tests for OtpInput
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import OtpInput from '../index';

describe('<OtpInput />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<OtpInput />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 OtpInput component', () => {
    const { getAllByTestId } = renderWithIntl(<OtpInput />);
    expect(getAllByTestId('otp-input').length).toBe(1);
  });
});
