import React from 'react';
import styled from 'styled-components';

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
        points={`${100 * multiplier},${20 * multiplier},${100 * multiplier},${100 * multiplier},${80 * multiplier},${100 * multiplier},`}
      />
      <polygon
        points={`${100 * multiplier},${40 * multiplier},${100 * multiplier},${100 * multiplier},${60 * multiplier},${100 * multiplier},`}
      />
      <polygon
        points={`${100 * multiplier},${60 * multiplier},${100 * multiplier},${100 * multiplier},${40 * multiplier},${100 * multiplier},`}
      />
      <polygon
        points={`${100 * multiplier},${80 * multiplier},${100 * multiplier},${100 * multiplier},${20 * multiplier},${100 * multiplier},`}
      />
    </SVGContainer>
  );
};

export default CornerArt;
