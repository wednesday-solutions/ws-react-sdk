/**
 *
 * CustomPassword
 *
 */

import React from 'react';
import { Input } from 'antd';
import styled from 'styled-components';
import { media, colors } from '@themes';

const PI = styled(Input.Password)`
  && {
    .anticon svg {
      color: black;
    }
    &.ant-input-affix-wrapper > input.ant-input {
      padding-left: 0.5rem;
    }
    &.ant-input-affix-wrapper {
      min-height: 3.5rem;
      background-color: ${colors.white};
      border: none;
      padding: 0 0.4rem;
      box-shadow: none;
      border: 1px solid ${colors.gray};
      width: 100%;
      border-radius: 8px;
      &::placeholder {
        color: ${colors.davyGray};
      }
      ${media.desktop.max(`
        min-height: 3rem;
      `)};
      ${media.largeMobile.max(`
        min-height: 2.5rem;
      `)};
    }
  }
`;
function CustomPassword(props) {
  return <PI data-testid={'custom-password'} {...props} />;
}

CustomPassword.propTypes = {};

export default CustomPassword;
