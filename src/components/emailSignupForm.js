import React from 'react';
import styled from 'styled-components';
import { FaCheck, FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';
import useEmail from '../utils/useEmail';
import useForm from '../utils/useForm';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 600px;
  padding: 2.5rem 5rem;
  background-color: var(--white);
  text-align: center;
  margin: auto;
  margin-bottom: ${(props) => (props.marginRequired ? '50px' : '')};
  margin-top: ${(props) => (props.marginRequired ? '-100px' : '')};
  filter: drop-shadow(var(--shadow));

  @media (max-width: 400px) {
    width: min-content;
    max-width: 225px;
    margin-bottom: ${(props) => (props.marginRequired ? '50px' : '')};
    margin-top: ${(props) => (props.marginRequired ? '-50px' : '')};
  }
`;

const FormGridContainer = styled.form`
  --height: 5rem;
  --padding: 0 1rem;

  position: relative;
  height: auto;
  filter: drop-shadow(var(--shadow));
  max-width: 500px;
  color: var(--black);
  margin: auto;

  @media (max-width: 400px) {
    margin: 0;
  }

  fieldset {
    display: flex;
    height: var(--height);
    border: none;
    padding: 0;
    margin: 0;
  }

  .chilliIsCool {
    display: none;
  }

  .signupButton {
    border: 2px solid var(--green);
    background-color: var(--white);
    color: var(--black);
    width: max-content;
    padding: var(--padding);
    margin: 2rem;
    margin-bottom: 1rem;
    height: var(--height);
    font-size: 1.75rem;
    border: none;
    cursor: pointer;
  }

  label {
    display: flex;
    align-items: center;
    padding: var(--padding);
    height: var(--height);
    font-size: 1.75rem;
    background-color: var(--grey);
  }

  .emailInput {
    padding: var(--padding);
    flex-grow: 1;
    border: none;
    height: var(--height);

    @media (max-width: 400px) {
      max-width: 200px;
    }
  }
`;

const MessageContainer = styled.div`
  position: absolute;
  display: flex;
  bottom: -30px;
  align-items: center;
  justify-content: center;
  background-color: var(--white);
  border-radius: var(--borderRadius);
  padding: 1.5rem;
  filter: drop-shadow(var(--shadow));

  animation: signup-response 1s 1;
  -webkit-animation: signup-response 1s 1;
  animation-fill-mode: forwards;

  animation-delay: 2s;
  -webkit-animation-delay: 2s;
  -webkit-animation-fill-mode: forwards;

  @keyframes signup-response {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @-webkit-keyframes signup-response {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  ::after {
    content: '';
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-bottom: 15px solid var(--white);
    position: absolute;
    top: -15px;
  }

  > * {
    padding: 1rem;
    margin: 0;
  }

  svg {
    fill: var(--green);
    border: 2px solid var(--green);
    border-radius: 50%;
    padding: 0.5rem;
    margin: 0 1rem;
    margin-left: 0.5rem;
  }

  svg[data-error] {
    fill: var(--red);
    border: 2px solid var(--red);
  }

  p {
    padding-left: 0;
  }
`;

const OutcomeMessageContainer = ({ error, message }) => (
  <MessageContainer>
    {error ? <FaTimes data-error /> : <FaCheck />}
    <p>{message}</p>
  </MessageContainer>
);

export const EmailSignup = () => {
  const { values, updateValue } = useForm({
    email: '',
    chilliIsCool: '',
  });
  const { message, loading, error, submitEmail } = useEmail({ values });
  const { email, chilliIsCool } = values;

  return (
    <>
      <FormGridContainer onSubmit={submitEmail}>
        <fieldset disabled={loading}>
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" className="emailInput" onChange={updateValue} value={email} />
          <input
            type="chilliIsCool"
            name="chilliIsCool"
            id="chilliIsCool"
            value={chilliIsCool}
            onChange={updateValue}
            className="chilliIsCool"
          />
        </fieldset>
        <button className="signupButton" type="submit" disabled={loading}>
          {loading ? 'Subscribing...' : ' Subscribe'}
        </button>
      </FormGridContainer>
      {message ? <OutcomeMessageContainer error={error} message={message} /> : ''}
    </>
  );
};

export default function EmailSignupForm({ marginRequired }) {
  return (
    // TODO: Add in extra design here for MDX use in blog posts
    <FormContainer marginRequired={marginRequired}>
      <h3>Like what you see?</h3>
      <p>Please consider signing up to my newsletter using the form below.</p>
      <EmailSignup />
    </FormContainer>
  );
}

EmailSignupForm.propTypes = {
  marginRequired: PropTypes.string,
};

OutcomeMessageContainer.propTypes = {
  error: PropTypes.bool,
  message: PropTypes.string,
};
