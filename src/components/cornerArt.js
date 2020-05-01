import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SVGContainer = styled.svg`
  position: absolute;
  bottom: ${props => props.bottom}px;
  right: ${props => props.right}px;
  transform: rotate(${props => props.rotation}deg);
`;

const CornerArt = ({ adjustments }) => {
  const [multiplier, rotation, bottom, right] = adjustments;
  return (
    <SVGContainer height={100 * multiplier} width={100 * multiplier} rotation={rotation} bottom={bottom} right={right}>
      <polygon
        points={`${100 * multiplier},${80 * multiplier},${100 * multiplier},${100 * multiplier},${20 * multiplier},${100 * multiplier},`}
        style={{ fill: 'rgba(121,37,22,255)' }}
      />
      <polygon
        points={`${100 * multiplier},${60 * multiplier},${100 * multiplier},${100 * multiplier},${40 * multiplier},${100 * multiplier},`}
        style={{ fill: 'rgba(149,55,32,255)' }}
      />
      <polygon
        points={`${100 * multiplier},${40 * multiplier},${100 * multiplier},${100 * multiplier},${60 * multiplier},${100 * multiplier},`}
        style={{ fill: 'rgba(178,74,43,255)' }}
      />
      <polygon
        points={`${100 * multiplier},${20 * multiplier},${100 * multiplier},${100 * multiplier},${80 * multiplier},${100 * multiplier},`}
        style={{ fill: 'rgba(207,92,54,255)' }}
      />
    </SVGContainer>
  );
};

CornerArt.propTypes = {
  adjustments: PropTypes.array.isRequired,
};

export default CornerArt;
