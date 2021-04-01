/**
 *
 * Tests for CustomButton
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import CustomButton from '../index';

describe('<CustomButton />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<CustomButton />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 CustomButton component', () => {
    const { getAllByTestId } = renderWithIntl(<CustomButton />);
    expect(getAllByTestId('custom-button').length).toBe(1);
  });
});
