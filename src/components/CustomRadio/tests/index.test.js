/**
 *
 * Tests for CustomRadio
 *
 */

import React from 'react';
import { renderWithIntl } from '@utils/testUtils';
import CustomRadio from '../index';

describe('<CustomRadio />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<CustomRadio />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 CustomRadio component', () => {
    const { getAllByTestId } = renderWithIntl(<CustomRadio />);
    expect(getAllByTestId('custom-radio').length).toBe(1);
  });
});
