/**
 *
 * Tests for CustomInputNumber
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import CustomInputNumber from '../index';

describe('<CustomInputNumber />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<CustomInputNumber />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 CustomInputNumber component', () => {
    const { getAllByTestId } = renderWithIntl(<CustomInputNumber />);
    expect(getAllByTestId('custom-input-number').length).toBe(1);
  });
});
