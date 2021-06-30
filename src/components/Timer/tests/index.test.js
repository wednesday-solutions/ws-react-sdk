/**
 *
 * Tests for Timer
 *
 */

import React from 'react';
import { fireEvent } from '@testing-library/dom';
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
  it('should handle resend button click and match the snapshot', async () => {
    const jestSpy = jest.fn();
    const { getByTestId } = renderWithIntl(
      <Timer initialSeconds={0} initialMinute={0} retryNo={2} resendCallback={jestSpy} />
    );
    fireEvent.click(getByTestId('t'));
    await timeout(3500);
    expect(getByTestId).toMatchSnapshot();
    expect(jestSpy).toBeCalled();
  });

  it('should handle minutes interval and match the snapshot ', async () => {
    const jestSpy = jest.fn();
    const { getByTestId } = renderWithIntl(
      <Timer initialSeconds={0} initialMinute={2} retryNo={2} resendCallback={jestSpy} />
    );
    expect(getByTestId).toMatchSnapshot();
  });
});
