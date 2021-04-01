/**
 *
 * CustomTextArea
 *
 */

import React from 'react';
import { Input } from 'antd';
import colors from '@themes/colors';
import styled from 'styled-components';
import { media } from '@themes';

const { TextArea } = Input;
const CT = styled(TextArea)`
  height: 7rem;
  ${media.desktop.max(`
    height: 3rem;
  `)}
  ${media.largeMobile.max(`
    height: 2.5rem;
  `)}
  &.ant-input, &.ant-input-affix-wrapper {
    padding-left: 1rem;
    padding-top: 1rem;
    background-color: ${colors.white};
    border: 1px solid ${colors.gray};
    width: 100%;
    border-radius: 8px;
    &.ant-form-item-label {
      font-size: 20px;
    }
    &::placeholder {
      color: ${colors.gray};
    }
  }
`;

function CustomTextArea(props) {
  return <CT data-testid={'custom-textarea'} {...props} />;
}

export default CustomTextArea;
