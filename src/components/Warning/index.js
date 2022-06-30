/**
 *
 * Warning
 *
 */

import React from 'react';
import { media, fonts, colors } from '@themes';
import styled from 'styled-components';
import T from '../T';
const StyledWarning = styled(T)`
  && {
    color: ${colors.appBlue};
    margin: 2rem 0rem 0rem 0rem;
    ${fonts.weights.fw600()};

    // mobile
    ${media.tablet.max(fonts.size.large())};
    
    // tablet
    ${media.tablet.min(fonts.size.xRegular())};

    // desktop
    ${media.desktop.min(`
      ${fonts.size.extraLarge()};
      ${fonts.weights.bold()};
    `)};
`;
function Warning(props) {
  return <StyledWarning data-testid="warning" {...props} />;
}

Warning.propTypes = {};

export default Warning;
