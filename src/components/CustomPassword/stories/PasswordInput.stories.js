/**
 *
 * Stories for CustomPassword
 *
 * @see https://github.com/storybookjs/storybook
 *
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import CustomPassword from '../index';

storiesOf('CustomPassword').add('simple', () => <CustomPassword id={text('id', 'CustomPassword')} />);
