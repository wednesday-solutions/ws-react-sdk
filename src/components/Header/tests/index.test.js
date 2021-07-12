/**
 *
 * Tests for Header
 *
 */

import React from 'react';
import { renderWithIntl } from '@utils/testUtils';
import {screen} from '@testing-library/react'
import Header from '../index';

describe('<Header />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<Header />);
    expect(baseElement).toMatchSnapshot();
  });

  describe('should ensure it renders title when the props is being passed',()=>{
    renderWithIntl(<Header header='wednesday'/>);
    const element = screen.getByTestId('title');
    expect(element).toMatchSnapshot()
  });

  describe('should ensure it renders notification when the props is being passed',()=>{
    renderWithIntl(<Header hasNotificationIcon={true}/>);
    const element = screen.getByTestId('notification-badge');
    expect(element).toMatchSnapshot()
  });
})
