/**
 *
 * Tests for Header
 *
 */

import React from 'react';
import { renderWithIntl } from '@utils/testUtils';
import Header from '../index';

describe('<Header />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<Header />);
    expect(baseElement).toMatchSnapshot();
  });
});
