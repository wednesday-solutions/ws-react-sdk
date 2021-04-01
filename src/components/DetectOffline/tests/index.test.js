/**
 *
 * Tests for DetectOffline
 *
 */

import React from 'react';
import { renderWithIntl } from '@utils/testUtils';
import NoInternet from '@components/NoInternet';
import DetectOffline from '../index';

describe('<DetectOffline />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(
      <DetectOffline OfflineComponent={() => <NoInternet textId="offline_text" />}>childrens</DetectOffline>
    );
    expect(baseElement).toMatchSnapshot();
  });
});
