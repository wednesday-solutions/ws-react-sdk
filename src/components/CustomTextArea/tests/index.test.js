/**
 *
 * Tests for CustomTextArea
 *
 */

import React from 'react';
import { renderWithIntl } from '@utils/testUtils';
import CustomTextArea from '../index';

describe('<CustomTextArea />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<CustomTextArea />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 CustomTextArea component', () => {
    const { getAllByTestId } = renderWithIntl(<CustomTextArea />);
    expect(getAllByTestId('custom-textarea').length).toBe(1);
  });
});
