/**
 *
 * Tests for CustomSearch
 *
 */

import React from 'react';
import { renderWithIntl } from '@utils/testUtils';
import CustomSearch from '../index';

describe('<CustomSearch />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<CustomSearch />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 CustomSearch component', () => {
    const { getAllByTestId } = renderWithIntl(<CustomSearch />);
    expect(getAllByTestId('custom-search').length).toBe(1);
  });
});
