/**
 *
 * Tests for BackgroundImg
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import BackgroundImg from '../index';

describe('<BackgroundImg />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<BackgroundImg />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 BackgroundImg component', () => {
    const { getAllByTestId } = renderWithIntl(<BackgroundImg />);
    expect(getAllByTestId('background-img').length).toBe(1);
  });
});
