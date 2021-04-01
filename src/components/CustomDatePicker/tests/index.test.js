/**
 *
 * Tests for CustomDatePicker
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import CustomDatePicker from '../index';

describe('<CustomDatePicker />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<CustomDatePicker />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 CustomDatePicker component', () => {
    const { getAllByTestId } = renderWithIntl(<CustomDatePicker />);
    expect(getAllByTestId('custom-date-picker').length).toBe(1);
  });
});
