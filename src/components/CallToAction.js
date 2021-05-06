import React from 'react';
import styled from 'styled-components';

const CTAContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--secondaryBg);
  width: 100vw;
  padding: 2.5rem 0;
  text-align: center;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--primaryBg);
    width: clamp(300px, 30vw, 600px);
    padding: 3rem 6rem;
    border-radius: var(--borderRadius);
    filter: drop-shadow(var(--shadow));
  }
`;

export function CallToAction() {
  return (
    <CTAContainer>
      <div>
        <h2 className="title">Got Questions?</h2>
        <h3 className="subtitle">Let’s book some time together to cover all your questions and concerns.</h3>
        <a href="/contact-me" className="callToAction">
          Book A Call.
        </a>
      </div>
    </CTAContainer>
  );
}
