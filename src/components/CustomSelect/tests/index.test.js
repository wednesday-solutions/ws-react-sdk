/**
 *
 * Tests for CustomSelect
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import CustomSelect from '../index';

describe('<CustomSelect />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<CustomSelect />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 CustomSelect component', () => {
    const { getAllByTestId } = renderWithIntl(<CustomSelect />);
    expect(getAllByTestId('custom-select').length).toBe(1);
  });
});
