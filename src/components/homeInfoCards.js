import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import device from './device';
import homeCards from '../data/homeCards.json';

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
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await controls.start(i => ({
        opacity: [0, 1, 1, 0],
        x: [-100, 0, 0, 100],
        transition: {
          delay: i * 2,
          duration: 2,
          ease: 'easeInOut',
          times: [0, 0.2, 0.8, 1],
        },
      }));
    };
    sequence();
  }, [controls]);

  return (
    <OverallContainer>
      {homeCards.map(({ title, content }, index) => (
        <CardContainer custom={index} animate={controls} key={index}>
          <h3>{title}</h3>
          <p>{content}</p>
        </CardContainer>
      ))}
    </OverallContainer>
  );
};

export default HomeInfoCards;
