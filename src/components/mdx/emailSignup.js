import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import DOMPurify from 'dompurify';

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
};

const buttonTap = {
  scale: 0.95,
};

const hiddenText = {
  y: 100,
  opacity: 0,
};

const visibleText = {
  y: 0,
  opacity: 100,
};

const EmailSignup = () => {
  const [formValue, setFormValue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const FORM_ID = process.env.CONVERTKIT_SIGNUP_FORM;
  const apiKey = process.env.CONVERTKIT_PUBLIC_KEY;

  function handleKeypress(e) {
    // const key = e.keyCode || e.charCode;
    // if (key === 8) {
    //   setFormValue(formValue.slice(0, formValue.length - 1));
    // }
    // if (![9, 20, 16, 17, 18, 8, 13].includes(key)) {
    //   setFormValue(formValue + e.key);
    // }
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const value = DOMPurify.sanitize(document.querySelector('input').value);
    setSubmitted(true);
    try {
      const response = await fetch(`https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`, {
        method: 'post',
        body: JSON.stringify({
          email: value,
          api_key: apiKey,
        }),
        headers: {
          'Content-Type': 'application/json',
          charset: 'utf-8',
        },
      });

      const responseJSON = await response.json();

      console.log(responseJSON);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SignupFormContainer>
      <h3>Want More Content?</h3>
      <h4>Join my weekly newsletter below.</h4>
      <FormItems>
        <input onKeyDown={handleKeypress} type="text" placeholder="Enter Email" name="email" required></input>
        <motion.button type="submit" whileHover={buttonHover} whileTap={buttonTap} onClick={handleSubmit}>
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
