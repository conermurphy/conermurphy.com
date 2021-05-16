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
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: ${(props) => (props.center ? 'center' : 'flex-start')};
  gap: 1rem;
  width: clamp(300px, 30vw, 500px);
  color: var(--primaryText);

  fieldset {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0;
    margin: 0;
    border: none;
    color: var(--accentText);

    label {
      border-radius: var(--borderRadius);
      filter: drop-shadow(var(--shadow));
      background-color: var(--secondaryBg);
      color: var(--primaryText);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      padding: 0 0 0 1rem;
      overflow: hidden;
      font-weight: bold;

      input {
        width: 100%;
        height: 3rem;
        border: 0;
        padding: 1rem;
        background-color: var(--secondaryBg);
        color: var(--primaryText);
      }
    }
  }

  .chilliIsCool {
    display: none;
  }

  .signupButton {
    color: var(--accentText);
    font-weight: bold;
    border: none;
    padding: 1rem;
    background-color: var(--accent);
    border-radius: var(--borderRadius);
    filter: drop-shadow(var(--shadow));
    cursor: pointer;
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

export const EmailSignup = ({ center }) => {
  const { values, updateValue } = useForm({
    email: '',
    chilliIsCool: '',
  });
  const { message, loading, error, submitEmail } = useEmail({ values });
  const { email, chilliIsCool } = values;

  return (
    <FormContainer>
      <FormGridContainer onSubmit={submitEmail} center={center}>
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
