/**
 *
 * CustomSearch
 *
 */

import React from 'react';
import styled from 'styled-components';
import { Input } from 'antd';
import colors from '@themes/colors';
const { Search } = Input;
const StyledSearch = styled(Search)`
  margin-right: 1rem;
  width: 20rem;
  &.ant-input-search > .ant-input-group > .ant-input-group-addon:last-child .ant-input-search-button {
    border: 1;
    background-color: ${colors.darkFuchsia};
    color: ${colors.white};
  }
  .ant-input {
    border: 1;
    height: 2rem;
  }
  .ant-input:focus {
    box-shadow: none;
  }
`;
function CustomSearch(props) {
  return <StyledSearch data-testid="custom-search" {...props} />;
}

CustomSearch.propTypes = {};

export default CustomSearch;
