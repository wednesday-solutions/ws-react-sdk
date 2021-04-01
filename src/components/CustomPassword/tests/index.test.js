/**
 *
 * Tests for CustomPassword
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import CustomPassword from '../index';

describe('<CustomPassword />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<CustomPassword />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 CustomPassword component', () => {
    const { getAllByTestId } = renderWithIntl(<CustomPassword />);
    expect(getAllByTestId('custom-password').length).toBe(1);
  });
});
