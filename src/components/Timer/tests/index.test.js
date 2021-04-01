/**
 *
 * Tests for Timer
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl, timeout } from '@utils/testUtils';
import Timer from '../index';

describe('<Timer />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<Timer />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 Timer component', () => {
    const { getAllByTestId } = renderWithIntl(<Timer />);
    expect(getAllByTestId('timer').length).toBe(1);
  });

  it('should render resend in 1 min', async () => {
    const { getAllByText } = renderWithIntl(<Timer initialSeconds={3} retryNo={2} />);
    await timeout(3500);
    expect(getAllByText(/RESEND/).length).toBe(1);
  });
});
