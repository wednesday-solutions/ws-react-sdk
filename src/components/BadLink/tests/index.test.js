/**
 *
 * Tests for BadLink
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import BadLink from '../index';

describe('<BadLink />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<BadLink />);
    expect(baseElement).toMatchSnapshot();
  });
});
