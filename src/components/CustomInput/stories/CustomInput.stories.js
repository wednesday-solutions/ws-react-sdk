/**
 *
 * Stories for CustomInput
 *
 * @see https://github.com/storybookjs/storybook
 *
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import CustomInput from '../index';

storiesOf('CustomInput').add('simple', () => <CustomInput id={text('id', 'CustomInput')} />);
