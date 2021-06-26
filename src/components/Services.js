import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Services from '../data/services.json';

const ServiceSectionContainer = styled.section`
  background-color: var(--secondaryBg);
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 5rem 0;

  & > h2,
  h3 {
    text-align: center;
  }

  .ServiceCardsContainer {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(clamp(300px, 50vw, 400px), 1fr));
    align-items: flex-start;
    gap: clamp(1rem, 2vw, 2rem);
    padding-top: 2rem;

    width: clamp(300px, 80vw, var(--maxWidth));
  }
`;

const ServiceCardContainer = styled(motion.div)`
  background-color: var(--primaryBg);
  filter: drop-shadow(var(--shadow));
  border-radius: var(--borderRadius);
  padding: 3rem;
  margin: 1rem;

  .serviceCardTitle {
    margin: 0;
    color: var(--primaryText);
    font-weight: 500;
    font-size: 2.5rem;
  }
`;

function ServiceCard({ service: { title, description } }) {
  return (
    <ServiceCardContainer>
      <h4 className="serviceCardTitle">{title}</h4>
      <p>{description}</p>
    </ServiceCardContainer>
  );
}

export function ServiceSection() {
  return (
    <ServiceSectionContainer id="services">
      <h2 className="title">Services</h2>
      <h3 className="subtitle">It's more than just a website...</h3>
      <div className="ServiceCardsContainer">
        {Services.map((service) => (
          <ServiceCard service={service} key={service.title} />
        ))}
      </div>
    </ServiceSectionContainer>
  );
}
