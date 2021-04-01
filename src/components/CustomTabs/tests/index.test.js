/**
 *
 * Tests for CustomTabs
 *
 */

import React from 'react';
import { renderWithIntl } from '@utils/testUtils';
import CustomTabs from '../index';

describe('<CustomTabs />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<CustomTabs />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 CustomTabs component', () => {
    const { getAllByTestId } = renderWithIntl(<CustomTabs />);
    expect(getAllByTestId('custom-tabs').length).toBe(1);
  });
});
