/**
 *
 * Stories for CustomSelect
 *
 * @see https://github.com/storybookjs/storybook
 *
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import CustomSelect from '../index';

storiesOf('CustomSelect').add('simple', () => <CustomSelect id={text('id', 'CustomSelect')} />);
