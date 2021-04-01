/**
 *
 * Tests for CustomUpload
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import CustomUpload from '../index';

describe('<CustomUpload />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<CustomUpload />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 CustomUpload component', () => {
    const { getAllByTestId } = renderWithIntl(<CustomUpload />);
    expect(getAllByTestId('custom-upload').length).toBe(1);
  });
});
