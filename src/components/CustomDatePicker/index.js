/**
 *
 * CustomDatePicker
 *
 */

import React from 'react';
import media from '@themes/media';
import colors from '@themes/colors';
import styled from 'styled-components';
import { DatePicker } from 'antd';

const StyledDatePicker = styled(DatePicker)`
  && {
    &.ant-picker {
      height: 3.5rem;
      ${media.desktop.max(`
      height: 3rem;
    `)};
      ${media.largeMobile.max(`
      height: 2.5rem;
    `)};
      width: 100%;
      border-radius: 8px;
      border: solid 1px ${colors.secondary};
    }
  }
`;
function CustomDatePicker(props) {
  return <StyledDatePicker data-testid="custom-date-picker" {...props} />;
}

CustomDatePicker.propTypes = {};

export default CustomDatePicker;
