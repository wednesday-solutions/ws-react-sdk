/**
 *
 * Stories for CustomButton
 *
 * @see https://github.com/storybookjs/storybook
 *
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import CustomButton from '../index';

storiesOf('CustomButton').add('simple', () => <CustomButton id={text('id', 'CustomButton')} />);
