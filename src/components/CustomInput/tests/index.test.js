/**
 *
 * Tests for CustomInput
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import CustomInput from '../index';

describe('<CustomInput />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<CustomInput />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 CustomInput component', () => {
    const { getAllByTestId } = renderWithIntl(<CustomInput />);
    expect(getAllByTestId('custom-input').length).toBe(1);
  });
});
