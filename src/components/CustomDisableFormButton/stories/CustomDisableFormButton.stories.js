/**
 *
 * Stories for CustomDisableFormButton
 *
 * @see https://github.com/storybookjs/storybook
 *
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import CustomDisableFormButton from '../index';

storiesOf('CustomDisableFormButton').add('simple', () => (
  <CustomDisableFormButton id={text('id', 'CustomDisableFormButton')} />
));
