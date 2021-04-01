/**
 *
 * Tests for CustomDisableFormButton
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import CustomDisableFormButton from '../index';

describe('<CustomDisableFormButton />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<CustomDisableFormButton />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 CustomDisableFormButton component', () => {
    const { getAllByTestId } = renderWithIntl(<CustomDisableFormButton />);
    expect(getAllByTestId('custom-disable-form-button').length).toBe(1);
  });
});
