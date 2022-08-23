/**
 *
 * CustomCheckbox
 *
 */

import React from 'react';
import { Checkbox } from 'antd';
import colors from '@themes/colors';
import styled from 'styled-components';

const CB = styled(Checkbox)`
  .ant-checkbox .ant-checkbox-inner {
    border-color: ${colors.appBlue};
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${colors.appBlue};
  }
`;

function CustomCheckbox(props) {
  return <CB data-testid={'custom-checkbox'} {...props} />;
}

export default CustomCheckbox;
