/**
 *
 * BadLink
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import T from '@components/T';
import Warning from '@components/Warning';
import { colors, fonts, media } from '@themes';
import { Button } from 'antd';

const MainDiv = styled.div`
  text-align: center;
`;

const ClawImage = styled.img`
  margin-top: 9rem;
  ${media.mobile.max(`
    width:75%;
    margin-top: 12rem;
  `)}
  ${media.tablet.max(`
    width:75%;
    margin-top: 10rem;
  `)}
`;

const Slow = styled(T)`
  ${fonts.style.standard()};
  color: ${colors.pawlyBlue};
  margin: 0rem;
  ${media.largeMobile.max(`
  font-size:0.75rem;
  `)}
`;
const TryButton = styled(Button)`
  border-radius: 6px;
  margin-top: 2rem;
  ${media.largeMobile.max(`
  text-align: center;
  `)}
`;
export function BadLink({ noPage }) {
  return (
    <div>
      <MainDiv>
        <ClawImage src={noPage} />
        <Warning id="clawful" />
        <Slow id="page_not_found" />
        <TryButton type="primary">Take Me Home</TryButton>
      </MainDiv>
    </div>
  );
}
BadLink.propTypes = {
  noPage: PropTypes.element.isRequired
};
export default BadLink;
