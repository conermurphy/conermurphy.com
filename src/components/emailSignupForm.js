import React from 'react';
import styled from 'styled-components';
import useEmail from '../utils/useEmail';
import useForm from '../utils/useForm';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 500px;
  padding: 5rem;
  background-color: var(--white);
  text-align: center;
  margin: auto;
  margin-top: -100px;
  margin-bottom: 50px;
  filter: var(--dropShadow);
`;

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
  const { message, loading, error, submitEmail } = useEmail({ values });
  const { email } = values;
  return (
    <FormGridContainer onSubmit={submitEmail}>
      <fieldset disabled={loading}>
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="email" className="emailInput" onChange={updateValue} value={email} />
        <button className="signupButton" type="submit" disabled={loading}>
          {loading ? 'Subscribing...' : ' Subscribe'}
        </button>
      </fieldset>
    </FormGridContainer>
  );
};

export default function EmailSignupForm() {
  return (
    // TODO: Add in extra design here for MDX use in blog posts
    <FormContainer>
      <h4>Like what you see?</h4>
      <p>Please consider signing up to my newsletter using the form below.</p>
      <EmailSignup />
    </FormContainer>
  );
}
