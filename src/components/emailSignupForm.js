import React from 'react';
import styled from 'styled-components';

const FormGridContainer = styled.div`
  display: flex;
  height: 5rem;
  align-items: center;
  max-width: 500px;
  background-color: var(--white);
  border-radius: 5px;
  overflow: hidden;
  filter: var(--dropShadow);

  button.signupButton {
    align-self: flex-end;
    background-color: var(--green);
    border-color: none;
    color: var(--white);
    width: max-content;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    height: 5rem;
    border: none;
  }

  input.emailInput {
    flex: 1;
  }
`;

export const EmailSignup = () => {
  console.log('hello');
  return (
    <FormGridContainer>
      <input type="email" placeholder="Enter your email here." className="emailInput" />
      <button className="signupButton" type="button">
        Subscribe!
      </button>
    </FormGridContainer>
  );
};

export default function EmailSignupForm() {
  return (
    // TODO: Add in extra design here for MDX use in blog posts
    <div>
      <EmailSignup />
    </div>
  );
}
