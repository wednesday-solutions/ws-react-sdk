/**
 *
 * Stories for MobileNumberWithCountryCode
 *
 * @see https://github.com/storybookjs/storybook
 *
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import MobileNumberWithCountryCode from '../index';

storiesOf('MobileNumberWithCountryCode').add('simple', () => (
  <MobileNumberWithCountryCode id={text('id', 'MobileNumberWithCountryCode')} />
));
