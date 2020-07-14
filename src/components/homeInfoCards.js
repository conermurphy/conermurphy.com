import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import device from './device';
import homeCards from '../data/homeCards.json';
import useInterval from '../hooks/useInterval';

const OverallContainer = styled(motion.div)`
  display: flex;
  flex-direction: row;
  position: relative;
  width: 70vw;
  height: 10rem;
`;

const CardContainer = styled(motion.div)`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 60vw;
  height: auto;
  background-color: var(--background-color);
  border-radius: 10px;
  margin: 0.5rem;
  padding: 1rem;
  text-align: center;
  box-shadow: 0px 0px 5px var(--drop-shadows);

  & > h3 {
    margin-top: 0;
  }
`;

const HomeInfoCards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { title, content } = homeCards[currentIndex];

  useInterval(() => {
    if (currentIndex < 4) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  }, 5000);

  const item = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: [0, 1, 1, 1, 0],
      x: [300, 0, 0, 0, -300],
      y: [0, 0, -5, 0, 0],
      scale: [0.9, 0.9, 0.95, 0.9, 0.9],
      transition: {
        duration: 5,
        ease: 'easeInOut',
        times: [0, 0.2, 0.4, 0.8, 1],
      },
    },
  };

  return (
    <OverallContainer>
      <AnimatePresence>
        <CardContainer variants={item} initial="hidden" animate="show" exit={{ opacity: 0, transition: { ease: 'easeInOut' } }} key={title}>
          <h3>{title}</h3>
          <p>{content}</p>
        </CardContainer>
      </AnimatePresence>
    </OverallContainer>
  );
};

export default HomeInfoCards;
