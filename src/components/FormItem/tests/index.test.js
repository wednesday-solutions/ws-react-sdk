/**
 *
 * Tests for FormItem
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import FormItem from '../index';

describe('<FormItem />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<FormItem />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 FormItem component', () => {
    const { getAllByTestId } = renderWithIntl(<FormItem />);
    expect(getAllByTestId('form-item').length).toBe(1);
  });
});
