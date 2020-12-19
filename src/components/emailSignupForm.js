import React from 'react';
import styled from 'styled-components';
import useForm from '../utils/useForm';

const FormGridContainer = styled.form`
  --height: 5rem;
  --padding: 0 1rem;

  height: var(--height);
  background-color: var(--white);
  border-radius: 5px;
  overflow: hidden;
  filter: var(--dropShadow);
  max-width: 500px;

  fieldset {
    display: flex;
    height: var(--height);
    border: none;
    padding: 0;
    width: 100%;
  }

  .signupButton {
    background-color: var(--green);
    border-color: none;
    color: var(--white);
    width: max-content;
    padding: var(--padding);
    height: var(--height);
    border: none;
  }

  label {
    display: flex;
    align-items: center;
    padding: var(--padding);
    height: var(--height);
    background-color: var(--grey);
  }

  .emailInput {
    padding: var(--padding);
    flex-grow: 1;
    border: none;
    height: var(--height);
  }
`;

export const EmailSignup = () => {
  const { values, updateValue } = useForm({
    email: '',
  });
  const { email } = values;
  return (
    <FormGridContainer>
      <fieldset>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          // placeholder="Enter your email here."
          className="emailInput"
          onChange={updateValue}
          value={email}
        />
        <button className="signupButton" type="button">
          Subscribe!
        </button>
      </fieldset>
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
