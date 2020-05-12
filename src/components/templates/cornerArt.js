import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SVGContainer = styled.svg`
  position: absolute;
  bottom: ${props => props.bottom}px;
  right: ${props => props.right}px;
  transform: rotate(${props => props.rotation}deg);
  height: ${props => props.height};
`;

const CornerArt = ({ adjustments }) => {
  const [height, rotation, bottom, right] = adjustments;
  return (
    <SVGContainer viewBox="0 0 100 100" height={height} rotation={rotation} bottom={bottom} right={right}>
      <polygon points="100 80 100 100 20 100" style={{ fill: 'rgba(121,37,22,255)' }} />
      <polygon points="100 60 100 100 40 100" style={{ fill: 'rgba(149,55,32,255)' }} />
      <polygon points="100 40 100 100 60 100" style={{ fill: 'rgba(178,74,43,255)' }} />
      <polygon points="100 20 100 100 80 100" style={{ fill: 'rgba(207,92,54,255)' }} />
    </SVGContainer>
  );
};

CornerArt.propTypes = {
  adjustments: PropTypes.array.isRequired,
};

export default CornerArt;
