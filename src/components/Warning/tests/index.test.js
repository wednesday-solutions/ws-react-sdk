/**
 *
 * Tests for Warning
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import Warning from '../index';

describe('<Warning />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<Warning />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 Warning component', () => {
    const { getAllByTestId } = renderWithIntl(<Warning />);
    expect(getAllByTestId('warning').length).toBe(1);
  });
});
