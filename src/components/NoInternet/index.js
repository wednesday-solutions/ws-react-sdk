/**
 *
 * NoInternet
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import T from '@components/T';
import Warning from '@components/Warning';
import { colors, fonts, media } from '@themes';

const MainDiv = styled.div`
  text-align: center;
`;
const DogImage = styled.img`
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
const Check = styled(T)`
  ${fonts.style.standard()};
  color: ${colors.pawlyBlue};
  margin: 0rem 0rem 2rem 0rem;
  ${media.largeMobile.max(`
  font-size:0.75rem;
  `)}
`;
export function NoInternet({ noConnection }) {
  return (
    <div>
      <MainDiv>
        <DogImage src={noConnection} />
        <Warning id="whoof" />
        <Slow id="slow_or_no" />
        <Check id="please_check" />
      </MainDiv>
    </div>
  );
}
NoInternet.propTypes = {
  noConnection: PropTypes.element.isRequired
};
export default NoInternet;
