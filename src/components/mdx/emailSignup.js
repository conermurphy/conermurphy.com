import React, { useState } from 'react';
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
  padding: 1.5rem 3rem;

  & > * {
    text-align: center;
    margin: 0.5rem;
  }

  & > h3 {
    font-size: 2rem;
    color: var(--header-font-color);
  }

  & > h4 {
    font-size: 1.5rem;
  }
`;

const FormItems = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  margin: 1rem;

  & > * {
    text-align: center;
    padding: 0.5rem;
    margin: 0.5rem;
    border: none;
    border-radius: 0.5rem;
    filter: drop-shadow(0 0 2px var(--drop-shadows));
  }

  & > input {
    height: 2rem;
    min-width: 40%;
    font-family: var(--body-font);
  }

  & > button {
    height: 3rem;
    min-width: 15%;
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

const EmailSignup = () => {
  const [status, setStatus] = useState('pending');

  const FORM_ID = process.env.CONVERTKIT_SIGNUP_FORM;
  const apiKey = process.env.CONVERTKIT_PUBLIC_KEY;

  const handleSubmit = async e => {
    e.preventDefault();
    const value = DOMPurify.sanitize(document.querySelector('input').value);
    setStatus('awaiting');
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

      if (responseJSON.error) throw responseJSON.error;

      setStatus('confirmed');
      document.querySelector('input').value = '';
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <SignupFormContainer>
      <svg width="100" height="100" viewBox="0 0 100 100">
        {
          {
            pending: (
              <>
                <path
                  d="
                    M 25 37.5
                    C 25 0 75 0 75 30
                    Q 75 45 62.5 50
                    T 50 70
                  "
                  stroke="black"
                  strokeWidth="1rem"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="50" cy="90" r="7.5" fill="black" />,
              </>
            ),
            awaiting: <circle cx="50" cy="50" r="45" fill="none" stroke="green" strokeWidth="2.5px" />,
            confirmed: (
              <>
                <path d="M 0 25 L 25 50" stroke="green" strokeWidth="2.5px" />
                <path d="M 25 50 L 50 0" stroke="green" strokeWidth="2.5px" />
              </>
            ),
            error: (
              <>
                <path d="M 0 0 L 50 50" stroke="red" strokeWidth="2.5px" />
                <path d="M 50 0 L 0 50" stroke="red" strokeWidth="2.5px" />
              </>
            ),
          }[status]
        }
      </svg>
      <h3>Want More Content?</h3>
      {
        {
          pending: <h4>Join my weekly newsletter below.</h4>,
          awaiting: <h4>Processing your email</h4>,
          confirmed: <h4>Thank you, please confirm your subscription via the email we sent you.</h4>,
          error: <h4>Erm, sorry there was an error...</h4>,
        }[status]
      }

      <FormItems>
        <input type="text" placeholder="Please Enter Your Email Here..." name="email" required></input>
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
