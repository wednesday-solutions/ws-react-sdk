/**
 *
 * FormItem
 *
 */

import React from 'react';
import { Form } from 'antd';
import styled from 'styled-components';
import colors from '@themes/colors';
import { media } from '@themes';

const FI = styled(Form.Item)`
  && {
    .ant-form-item-explain,
    .ant-form-item-extra {
      text-align: left;
    }
    .ant-form-item {
      margin: 0;
    }
    .ant-form-item-has-error .ant-input,
    .ant-form-item-has-error .ant-input:hover,
    .ant-form-item-has-error .ant-input,
    .ant-form-item-has-error .ant-input:focus-within {
      background-color: ${colors.white};
      box-shadow: none;
    }
    .ant-form-item-has-error .ant-input-affix-wrapper,
    .ant-form-item-has-error .ant-input-affix-wrapper:hover {
      background-color: ${colors.white};
      box-shadow: none;
    }
    &.ant-form-item-control-input {
      min-height: 3.5rem;
      ${media.desktop.max(`
      min-height: 3rem;
    `)}
      ${media.largeMobile.max(`
      min-height: 2.5rem;
    `)}
    width: 100%;
    }
  }
`;

function FormItem(props) {
  return <FI data-testid={'form-item'} {...props} />;
}

FormItem.propTypes = {};

export default FormItem;
