/**
 *
 * Tests for ProfileWidget
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import ProfileWidget from '../index';

describe('<ProfileWidget />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<ProfileWidget />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 ProfileWidget component', () => {
    const { getAllByTestId } = renderWithIntl(<ProfileWidget />);
    expect(getAllByTestId('profile-widget').length).toBe(1);
  });
});
