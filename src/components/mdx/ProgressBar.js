import React from 'react';
import { motion, useSpring, useTransform, useViewportScroll } from 'framer-motion';
import styled from 'styled-components';

const ProgressBarSVG = styled.svg`
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 999;

  & > path {
    stroke: var(--accent);
  }
`;

export function ProgressBar() {
  const { scrollYProgress } = useViewportScroll();
  const yRange = useTransform(scrollYProgress, [0, 0.9], [0, 1]);
  const pathLength = useSpring(yRange, { stiffness: 400, damping: 90 });

  return (
    <ProgressBarSVG viewBox="0 0 100 1">
      <motion.path
        fill="none"
        d="M 0,0 L 100,0"
        style={{
          pathLength,
        }}
      />
    </ProgressBarSVG>
  );
}
