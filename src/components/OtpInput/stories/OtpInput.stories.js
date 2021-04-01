/**
 *
 * Stories for OtpInput
 *
 * @see https://github.com/storybookjs/storybook
 *
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import OtpInput from '../index';

storiesOf('OtpInput').add('simple', () => <OtpInput id={text('id', 'OtpInput')} />);
