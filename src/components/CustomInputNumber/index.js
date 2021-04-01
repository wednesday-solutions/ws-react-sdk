/**
 *
 * CustomInputNumber
 *
 */

import React from 'react';
import styled from 'styled-components';
import { media, colors } from '@themes';
import { InputNumber as IN } from 'antd';

const InputNumber = styled(IN)`
  && {
    border: solid 1px ${colors.secondary};
    border-radius: 8px;
    border: solid 1px ${colors.secondary};

    .ant-input-number,
    .ant-input-number-input,
    .ant-input-number-input-wrap,
    .ant-input-affix-wrapper {
      height: 3.5rem;
      ${media.desktop.max(`
      height: 3rem;
    `)}
      ${media.largeMobile.max(`
      height: 2.5rem;
    `)}
    width: 100%;
    }
    & .ant-form-item-control-input {
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

function CustomInputNumber(props) {
  return <InputNumber data-testid="custom-input-number" {...props} />;
}

CustomInputNumber.propTypes = {};

export default CustomInputNumber;
