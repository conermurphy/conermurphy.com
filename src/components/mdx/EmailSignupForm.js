import React from 'react';
import styled from 'styled-components';
import { EmailSignup } from '../EmailSignup';

const EmailSignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin: auto;
  margin-top: 5rem;
  padding: 2rem 5rem;
  border-top: 3px solid var(--accent);
  background-color: var(--secondaryBg);
  filter: drop-shadow(var(--shadow));

  text-align: center;

  & > div {
    margin-bottom: 2rem;

    & > h3 {
      margin: 1rem;
    }

    & > p {
      margin: 0.5rem;
    }
  }
`;

export function EmailSignupForm() {
  return (
    <EmailSignupContainer>
      <div>
        <h3>Email Newsletter</h3>
        <p>Want to get weekly notifications of my posts and more exclusive content?</p>
        <p>Please consider signing up to my email newsletter.</p>
      </div>
      <EmailSignup />
    </EmailSignupContainer>
  );
}
