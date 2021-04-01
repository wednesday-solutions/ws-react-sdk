/**
 *
 * T
 *
 */

import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { PropTypes } from 'prop-types';
import If from '@components/If';
import { fonts } from '@themes';

const StyledText = styled.p`
  && {
    ${props => props.marginBottom && `margin-bottom: ${props.marginBottom}px;`};
    ${props => props.font && props.font()};
  }
`;
const getFontStyle = type => (type && fonts.style[type] ? fonts.style[type] : null);
export const T = ({ type, text, id, marginBottom, values, ...otherProps }) => (
  <StyledText data-testid="t" font={getFontStyle(type)} marginBottom={marginBottom} {...otherProps}>
    <If condition={id} otherwise={text}>
      <FormattedMessage id={id} values={values} />
    </If>
  </StyledText>
);

T.propTypes = {
  id: PropTypes.string,
  marginBottom: PropTypes.number,
  values: PropTypes.object,
  text: PropTypes.string,
  type: PropTypes.oneOfType(Object.keys(fonts.style))
};

T.defaultProps = {
  values: {}
};

const TextComponent = T;
export default TextComponent;
