/**
 *
 * CustomUpload
 *
 */

import React from 'react';
import styled from 'styled-components';
import { Upload } from 'antd';
const StyledCustomUpload = styled(Upload)`
  && {
    .ant-upload {
      width: 100%;
    }
  }
`;
function CustomUpload(props) {
  return <StyledCustomUpload data-testid="custom-upload" {...props} />;
}

CustomUpload.propTypes = {};

export default CustomUpload;
