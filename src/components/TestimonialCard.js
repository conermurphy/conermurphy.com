import React from 'react';
import styled from 'styled-components';
import { FaQuoteLeft } from 'react-icons/fa';
import PropTypes from 'prop-types';

const TestimonialContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: var(--borderRadius);
  filter: drop-shadow(var(--shadow));
  background-color: var(--white);
  position: relative;
  height: min-content;

  & ::after {
    content: '';
    position: absolute;
    bottom: -2rem;
    width: 0;
    height: 0;
    border-left: 2rem solid transparent;
    border-right: 2rem solid transparent;
    border-top: 2rem solid var(--white);
  }

  & > .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    margin: 2rem;
    border: 2px solid var(--green);
    border-radius: 50%;
    margin-bottom: 0;

    & > svg {
      height: 2.5rem;
      width: 2.5rem;
    }
  }

  & > p {
    padding: 1rem 3rem;
    padding-top: 0;
  }

  & > .details {
    display: grid;
    grid-template-columns: repeat(2, 50%);
    align-items: center;
    justify-items: center;
    border-top: 0.25rem solid var(--grey);
    width: 100%;
    padding: 1.5rem 0;

    & > p {
      display: flex;
      align-items: center;
      font-size: 1.5rem;
      height: 100%;
      font-weight: bold;
      margin: 0;
    }
  }
`;

export default function TestimonialCard({ testimonial }) {
  const { date, person, company, testimonial: text } = testimonial;
  return (
    <TestimonialContainer>
      <div className="icon">
        <FaQuoteLeft />
      </div>
      <p>{text}</p>
      <div className="details">
        <p>{person}</p>
        <p>{company}</p>
      </div>
    </TestimonialContainer>
  );
}

TestimonialCard.propTypes = {
  date: PropTypes.string,
  person: PropTypes.string,
  company: PropTypes.string,
  testimonial: PropTypes.string,
};
