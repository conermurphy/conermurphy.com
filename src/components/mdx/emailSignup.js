import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SignupFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--secondary-color);
  background-color: var(--secondary-color);
  margin: 2rem 0 0 0;
  filter: drop-shadow(0 0 2px var(--drop-shadows));
  padding: 3rem;

  & > h3 {
    font-size: 2rem;
    margin: 0.5rem;
    color: var(--header-font-color);
  }

  & > h4 {
    font-size: 1.5rem;
    margin: 0.5rem;
  }
`;

const FormItems = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 1rem;

  & > * {
    padding: 0.5rem;
    margin: 0.5rem;
    border: none;
    border-radius: 0.5rem;
    filter: drop-shadow(0 0 2px var(--drop-shadows));
  }

  & > input {
    height: 2rem;
    width: 40%;
    font-family: var(--body-font);
  }

  & > button {
    width: 15%;
    font-family: var(--body-font);
    font-weight: 600;
    background-color: var(--header-font-color);
    color: white;
  }
`;

const buttonHover = {
  scale: 1.05,
  ease: 'easeInOut',
};

const buttonTap = {
  scale: 0.95,
  ease: 'easeInOut',
};

const EmailSignup = () => {
  const email = '';

  return (
    <SignupFormContainer>
      <h3>Want More Content?</h3>
      <h4>Join my weekly newsletter below.</h4>
      <FormItems>
        <input type="text" placeHolder="Enter Email" name="email" required></input>
        <motion.button type="submit" whileHover={buttonHover} whileTap={buttonTap}>
          Sign Up
        </motion.button>
      </FormItems>
      <p>
        <i>Don't worry, I won't send you spam and you can unsubscribe at any time.</i>
      </p>
    </SignupFormContainer>
  );
};

export default EmailSignup;
