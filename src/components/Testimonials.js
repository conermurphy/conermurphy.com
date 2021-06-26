import React from 'react';
import styled from 'styled-components';
import { IoChatboxOutline } from 'react-icons/io5';
import testimonials from '../data/testimonials.json';

const TestimonialSectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0 10rem;
  width: 100vw;
  padding: 5rem 0;
  background-color: var(--secondaryBg);

  .sectionTitle {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 3rem;

    & > .subtitle {
      width: clamp(300px, 80%, 1000px);
    }
  }

  .TestimonialCardsContainer {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;
    gap: 5rem;
    padding-top: 2rem;
    width: clamp(300px, 80vw, var(--maxWidth));
  }
`;

const TestimonialCardContainer = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  justify-self: center;

  width: clamp(250px, 50vw, 400px);

  background-color: var(--primaryBg);
  padding: 3rem;

  border-radius: var(--borderRadius);

  filter: drop-shadow(var(--shadow));

  & > a {
    text-decoration: none;
    font-weight: bold;
  }

  & > h4 {
    width: auto;
  }
`;

const TestimonialIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  bottom: -2rem;
  left: -2rem;

  background-color: var(--accent);
  color: var(--accentText);

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
  const { person, company, testimonial: text, website } = testimonial;
  return (
    <TestimonialCardContainer>
      <h4 className="title">
        {person} | {company}
      </h4>
      <p className="text">{text}</p>
      <a href={website} target="_blank" rel="noopener noreferrer">
        Visit their website.
      </a>
      <TestimonialIcon />
    </TestimonialCardContainer>
  );
}

export function Testimonials() {
  return (
    <TestimonialSectionContainer id="testimonials">
      <div className="sectionTitle">
        <h2 className="title">What People Have Been Saying...</h2>
        <h3 className="subtitle">
          It’s not just about building amazing websites. It’s about fostering great relationships and understanding your businesses needs...
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
