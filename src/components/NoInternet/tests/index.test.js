/**
 *
 * Tests for NoInternet
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import NoInternet from '../index';

describe('<NoInternet />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<NoInternet />);
    expect(baseElement).toMatchSnapshot();
  });
});
