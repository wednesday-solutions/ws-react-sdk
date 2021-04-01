/**
 *
 * Stories for CustomInputNumber
 *
 * @see https://github.com/storybookjs/storybook
 *
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import CustomInputNumber from '../index';

storiesOf('CustomInputNumber').add('simple', () => <CustomInputNumber id={text('id', 'CustomInputNumber')} />);
