import React from 'react';
import styled from 'styled-components';
import device from './device';
import homeCards from '../data/homeCards.json';

const HomeInfoCards = () => {
  homeCards.forEach(card => console.log(card));
  return null;
};

export default HomeInfoCards;
