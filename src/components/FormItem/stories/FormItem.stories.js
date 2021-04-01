/**
 *
 * Stories for FormItem
 *
 * @see https://github.com/storybookjs/storybook
 *
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import FormItem from '../index';

storiesOf('FormItem').add('simple', () => <FormItem id={text('id', 'FormItem')} />);
