import React from 'react';
import styled from 'styled-components';

const SVGContainer = styled.svg`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const CornerArt = () => {
  const multiplier = 1.5;
  return (
    // <SVGContainer>
    <SVGContainer height={100 * multiplier} width={100 * multiplier}>
      {/* <polygon points="100,20 100,100 80,100" className="triangle" /> */}
      {/* <polygon points="100,40 100,100 60,100" className="triangle" />
        <polygon points="100,60 100,100 40,100" className="triangle" />
        <polygon points="100,80 100,100 20,100" className="triangle" /> */}
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
    // </SVGContainer>
  );
};

export default CornerArt;
