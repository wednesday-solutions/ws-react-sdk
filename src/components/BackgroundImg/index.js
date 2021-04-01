/**
 *
 * BackgroundImg
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ImageContainer = styled.div`
  width: ${props => props.width || `60%`};
  max-height: ${props => props.maxHeight || `100%`};
  background-image: url(${props => props.img});
  background-position: 0 0;
  background-repeat: no-repeat;
  background-size: cover;
`;

function BackgroundImg(props) {
  return <ImageContainer data-testid={'background-img'} {...props} />;
}

BackgroundImg.propTypes = {
  img: PropTypes.string
};

export default BackgroundImg;
