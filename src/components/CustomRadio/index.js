/**
 *
 * CustomRadio
 *
 */

import React from 'react';
import { Radio } from 'antd';
import colors from '@themes/colors';
import styled from 'styled-components';

const CR = styled(Radio)`
  .ant-radio .ant-radio-inner {
    border-color: ${colors.appBlue};
  }
  .ant-radio-checked .ant-radio-inner:after {
    background-color: ${colors.appBlue};
  }
`;

function CustomRadio(props) {
  return <CR data-testid={'custom-radio'} {...props} />;
}

export default CustomRadio;
