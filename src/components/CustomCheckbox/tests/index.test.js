/**
 *
 * Tests for CustomCheckbox
 *
 */

import React from 'react';
import { renderWithIntl } from '@utils/testUtils';
import CustomCheckbox from '../index';

describe('<CustomCheckbox />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<CustomCheckbox />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 CustomCheckbox component', () => {
    const { getAllByTestId } = renderWithIntl(<CustomCheckbox />);
    expect(getAllByTestId('custom-checkbox').length).toBe(1);
  });
});
