/**
 *
 * CustomTabs
 *
 */

import React from 'react';
import { Tabs } from 'antd';
import colors from '@themes/colors';
import styled from 'styled-components';

const StyledTabs = styled(Tabs)`
  && {
    &.ant-tabs {
      background: ${colors.white};
      width: 100%;
      padding: 0 0.5rem;
    }
    .ant-tabs-content-holder {
      width: 100%;
    }

    .ant-tabs-tab .ant-tabs-tab-btn {
      display: flex;
      flex-direction: column;
    }
  }
`;

function CustomTabs(props) {
  return <StyledTabs data-testid={'custom-tabs'} {...props} />;
}

export default CustomTabs;
