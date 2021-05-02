import React from 'react';
import styled from 'styled-components';
import { FaLaptopCode } from 'react-icons/fa';
import Services from '../data/services.json';

const ServiceSectionContainer = styled.section`
  background-color: var(--secondaryBg);
  width: 100vw;
  display: flex;
  justify-content: center;
  padding: 7rem;

  & > div {
    max-width: 1400px;
    width: 100%;

    & > h2,
    h3 {
      text-align: center;
    }
  }

  .ServiceCardsContainer {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    align-items: flex-start;
    gap: 4rem 6rem;
    padding-top: 2rem;
  }
`;

const ServiceCardContainer = styled.div`
  background-color: var(--primaryBg);
  filter: drop-shadow(var(--shadow));
  border-radius: var(--borderRadius);
  padding: 3rem;

  .serviceCardTitle {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1.5rem;

    & > h4 {
      margin: 0;
      color: var(--primaryText);
    }

    & > svg {
      background-color: var(--accent);
      color: var(--primaryBg);
      padding: 1rem;
      border-radius: calc(var(--borderRadius) / 2);
    }
  }
`;

function ServiceCard({ service: { title, description, icon } }) {
  let displayIcon;
  switch (icon) {
    case 'laptop':
      displayIcon = <FaLaptopCode />;
      break;
    default:
      displayIcon = '';
  }

  return (
    <ServiceCardContainer>
      <div className="serviceCardTitle">
        {displayIcon}
        <h4>{title}</h4>
      </div>
      <p>{description}</p>
    </ServiceCardContainer>
  );
}

export function ServiceSection() {
  return (
    <ServiceSectionContainer>
      <div>
        <h2 className="sectionTitle">Services</h2>
        <h3 className="subtitle">It's more than just a website...</h3>
        <div className="ServiceCardsContainer">
          {Services.map((service) => (
            <ServiceCard service={service} key={service.title} />
          ))}
        </div>
      </div>
    </ServiceSectionContainer>
  );
}
