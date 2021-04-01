/**
 *
 * Tests for MobileNumberWithCountryCode
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import MobileNumberWithCountryCode from '../index';

describe('<MobileNumberWithCountryCode />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<MobileNumberWithCountryCode />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 MobileNumberWithCountryCode component', () => {
    const { getAllByTestId } = renderWithIntl(<MobileNumberWithCountryCode />);
    expect(getAllByTestId('mobile-number-with-country-code').length).toBe(1);
  });
});
