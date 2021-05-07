import React from 'react';
import styled from 'styled-components';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import useEmail from '../utils/useEmail';
import useForm from '../utils/useForm';

const FormContainer = styled.div`
  position: relative;
`;

const FormGridContainer = styled.form`
  --height: 6rem;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  height: var(--height);
  width: clamp(300px, 30vw, 500px);

  color: var(--primaryText);

  box-shadow: var(--shadow);
  border-radius: var(--borderRadius);
  overflow: hidden;

  fieldset {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-grow: 1;

    padding: 0;
    border: none;
    height: var(--height);
    background-color: var(--accent);
    color: var(--accentText);

    label {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      flex-grow: 1;
      padding-left: 1.5rem;

      input {
        width: 100%;
        height: var(--height);
        border: 0;
        padding-left: 1rem;
      }
    }
  }

  .chilliIsCool {
    display: none;
  }

  .signupButton {
    background-color: var(--accent);
    color: var(--accentText);
    font-weight: bold;
    border: none;
    padding: var(--padding);
    cursor: pointer;
    padding: 0 3rem;
    align-self: flex-end;
    height: var(--height);
  }
`;

const MessageContainer = styled.div`
  position: absolute;

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--secondaryBg);
  border-radius: var(--borderRadius);
  padding: 0.5rem;
  filter: drop-shadow(var(--shadow));

  right: 10%;
  top: 75px;

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
    border-bottom: 15px solid var(--secondaryBg);
    position: absolute;
    top: -15px;
  }

  > * {
    padding: 1rem;
    margin: 0;
  }

  svg {
    fill: #89a98c;
    padding: 1rem;
    margin: 0 0.5rem;
  }

  svg[data-error] {
    fill: #e95d70;
    border: 2px solid #e95d70;
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
    <FormContainer>
      <FormGridContainer onSubmit={submitEmail}>
        <fieldset disabled={loading}>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              name="email"
              id={`email-${Math.random().toString(36).substring(2, 15)}`}
              placeholder="Please enter your email..."
              className="emailInput"
              onChange={updateValue}
              value={email}
            />
          </label>
          <input
            type="chilliIsCool"
            name="chilliIsCool"
            id="chilliIsCool"
            value={chilliIsCool}
            onChange={updateValue}
            className="chilliIsCool"
          />
        </fieldset>
        <motion.button className="signupButton" type="submit" disabled={loading} whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }}>
          {loading ? 'Subscribing...' : ' Subscribe'}
        </motion.button>
      </FormGridContainer>
      {message ? <OutcomeMessageContainer error={error} message={message} /> : ''}
    </FormContainer>
  );
};
