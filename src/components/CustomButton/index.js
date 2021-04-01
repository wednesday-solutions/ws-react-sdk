/**
 *
 * CustomButton
 *
 */

import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import { colors, fonts, media } from '@themes';

const CB = styled(Button)`
  &.ant-btn-lg {
    ${props => props.width && `width: ${props.width}%;`};
    border-radius: 8px;
    height: 3.5rem;
    ${media.desktop.max(`
      height: 3rem;
    `)}
    ${media.largeMobile.max(`
      height: 2.5rem;
    `)}
    ${fonts.style.xRegularFW600()};
    margin-bottom: 1rem;
    border: 2px solid ${colors.green};
  }
`;

function CustomButton(props) {
  return <CB data-testid={'custom-button'} {...props} />;
}

CustomButton.propTypes = {};

export default CustomButton;
