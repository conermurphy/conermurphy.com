import React from 'react';
import styled from 'styled-components';
import device from './device';
import homeCards from '../data/homeCards.json';

const HomeInfoCards = () => {
  console.log(homeCards);
  return (
    <div>
      {homeCards.map(({ title, description }, index) => (
        <p key={index}>{title}</p>
      ))}
    </div>
  );
};

export default HomeInfoCards;
