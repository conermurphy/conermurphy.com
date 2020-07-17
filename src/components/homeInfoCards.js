import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLocationArrow, FaQuestion, FaCoffee, FaGamepad, FaKeyboard } from 'react-icons/fa';
import homeCards from '../data/homeCards.json';
import useInterval from '../hooks/useInterval';
import device from './device';

const OverallContainer = styled(motion.div)`
  display: flex;
  flex-direction: row;
  width: 100vw;
  justify-content: center;
  align-items: center;
  height: 50vh;

  @media ${device.tablet} {
    height: 25vh;
  }
`;

const CardContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 60vw;
  max-width: 25rem;
  height: auto;
  background-color: var(--header-font-color);
  border-radius: 10px;
  margin: auto;
  padding: 2rem;
  text-align: center;
  box-shadow: 0px 2px 10px var(--drop-shadows);

  & > h3 {
    margin-top: 0;
    color: rgba(248, 245, 245, 255);
  }

  & > p {
    color: rgba(248, 245, 245, 255);
  }

  & > svg {
    font-size: 2.5rem;
    color: rgba(248, 245, 245, 255);
    margin: 1rem;
  }
`;

const Icon = ({ card }) =>
  ({
    Location: <FaLocationArrow />,
    Description: <FaQuestion />,
    'Other Content': <FaKeyboard />,
    Coffee: <FaCoffee />,
    Hobbies: <FaGamepad />,
  }[card]);

const HomeInfoCards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { logo, title, content } = homeCards[currentIndex];

  useInterval(() => {
    if (currentIndex < 4) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  }, 10000);

  const item = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: [0, 1, 1, 1, 0],
      x: [800, 0, 0, 0, -800],
      y: [0, 0, -5, 0, 0],
      transition: {
        duration: 10,
        ease: 'easeInOut',
        times: [0, 0.2, 0.4, 0.8, 1],
      },
    },
  };

  return (
    <OverallContainer>
      <AnimatePresence>
        <CardContainer variants={item} initial="hidden" animate="show" exit={{ opacity: 0, transition: { ease: 'easeInOut' } }} key={title}>
          <Icon card={logo} />
          <h3>{title}</h3>
          <p>{content}</p>
        </CardContainer>
      </AnimatePresence>
    </OverallContainer>
  );
};

export default HomeInfoCards;
