/**
 *
 * Tests for Clickable
 *
 */

import React from 'react';
import { renderWithIntl } from '@utils/testUtils';
import Clickable from '../index';

describe('<Clickable /> component tests', () => {
  let clickSpy;
  beforeEach(() => {
    clickSpy = jest.fn();
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<Clickable onClick={clickSpy} textId="repo_list" />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 Clickable component', () => {
    const { getAllByTestId } = renderWithIntl(<Clickable onClick={clickSpy} textId="repo_list" />);
    expect(getAllByTestId('clickable').length).toBe(1);
  });
});
