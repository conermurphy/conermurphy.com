import React from 'react';
import styled from 'styled-components';
import { IoChatboxOutline } from 'react-icons/io5';
import testimonials from '../data/testimonials.json';

const TestimonialSectionContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10rem;

  width: 100vw;

  padding: 7rem;

  background-color: var(--secondaryBg);

  .sectionTitles {
    max-width: 800px;
  }

  .TestimonialCardsContainer {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    align-items: center;
    justify-content: center;
    gap: 5rem;
  }
`;

const TestimonialCardContainer = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  max-width: 500px;

  background-color: var(--primaryBg);
  padding: 2.5rem;

  border-radius: var(--borderRadius);

  filter: drop-shadow(var(--shadow));
`;

const TestimonialIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  bottom: -2rem;
  left: -2rem;

  background-color: var(--accent);
  color: var(--primaryBg);

  border-radius: 0.5rem;
  padding: 1rem;

  & > svg {
    font-size: 2.5rem;
  }
`;

function TestimonialIcon() {
  return (
    <TestimonialIconContainer>
      <IoChatboxOutline />
    </TestimonialIconContainer>
  );
}

export function TestimonialCard({ testimonial }) {
  const { person, company, testimonial: text } = testimonial;
  return (
    <TestimonialCardContainer>
      <div>
        <h4 className="title">
          {person} | {company}
        </h4>
        <p className="text">{text}</p>
      </div>
      <TestimonialIcon />
    </TestimonialCardContainer>
  );
}

export function Testimonials() {
  return (
    <TestimonialSectionContainer>
      <div className="sectionTitles">
        <h2 className="title">What People Have Been Saying...</h2>
        <h3 className="subtitle">
          It’s not just about building amazing websites. It’s about fostering a great relationship and understanding your businesses needs.
          Here’s what People Have Been Saying...
        </h3>
      </div>
      <div className="TestimonialCardsContainer">
        {testimonials.map((testimonial) => (
          <TestimonialCard testimonial={testimonial} key={testimonial.company} />
        ))}
      </div>
    </TestimonialSectionContainer>
  );
}
