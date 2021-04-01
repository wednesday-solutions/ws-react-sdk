/**
 *
 * Stories for BackgroundImg
 *
 * @see https://github.com/storybookjs/storybook
 *
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import BackgroundImg from '../index';

storiesOf('BackgroundImg').add('simple', () => <BackgroundImg id={text('id', 'BackgroundImg')} />);
