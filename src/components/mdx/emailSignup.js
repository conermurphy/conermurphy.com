import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
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
    color: var(--green);
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
    font-family: var(--);
    background-color: var(--white);
    border: 2px solid var(--green);
  }

  & > button {
    height: 3rem;
    min-width: 15%;
    font-family: var(--body-font);
    font-weight: 600;
    background-color: var(--green);
    color: white;
  }
`;

const awaitingRotate = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
`;

const StatusSVG = styled.svg`
  animation: ${(props) => (props.status === 'awaiting' ? awaitingRotate : 'none')} 2s ease-in-out infinite;
`;

const animateHover = {
  scale: [0.95, 1.05, 0.95],
};

const transitionHover = {
  duration: 2,
  loop: Infinity,
  ease: 'easeInOut',
};

const buttonHover = {
  scale: 1.05,
};

const buttonTap = {
  scale: 0.95,
};

const EmailSignup = () => {
  const [status, setStatus] = useState('pending');

  const formID = process.env.GATSBY_CONVERTKIT_SIGNUP_FORM;
  const apiKey = process.env.GATSBY_CONVERTKIT_PUBLIC_KEY;

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = DOMPurify.sanitize(document.querySelector('input').value);
    setStatus('awaiting');
    setTimeout(async () => {
      try {
        const response = await fetch(`https://api.convertkit.com/v3/forms/${formID}/subscribe`, {
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
    }, 1000);
  };

  return (
    <SignupFormContainer>
      <StatusSVG width="100" height="100" viewBox="0 0 100 100" status={status}>
        <circle cx="50" cy="50" r="50" fill="var(--green)" />
        {
          {
            pending: (
              <>
                <motion.path
                  d="
                    M 35 25
                    Q 50 12.5 62.5 25
                    Q 72.5 40 60 50
                    Q 55 55 50 60
                  "
                  stroke="white"
                  strokeWidth="1rem"
                  strokeLinecap="round"
                  fill="none"
                  animate={animateHover}
                  transition={transitionHover}
                />
                <motion.circle cx="50" cy="82.5" r="0.5rem" fill="white" animate={animateHover} transition={transitionHover} />,
              </>
            ),
            awaiting: (
              <>
                <circle cx="50" cy="25" r="5" fill="white" stroke="none" />
                <circle cx="67.5" cy="32.5" r="5" fill="white" stroke="none" />
                <circle cx="75" cy="50" r="5" fill="white" stroke="none" />
                <circle cx="67.5" cy="67.5" r="5" fill="white" stroke="none" />
                <circle cx="50" cy="75" r="5" fill="white" stroke="none" />
                <circle cx="32.5" cy="67.5" r="5" fill="white" stroke="none" />
                <circle cx="25" cy="50" r="5" fill="white" stroke="none" />
                <circle cx="32.5" cy="32.5" r="5" fill="white" stroke="none" />
              </>
            ),
            confirmed: (
              <>
                <path
                  d="
                  M 31.75 50.25 
                  L 45.50 63.75
                  Q 47.50 68.75 73.75 36.25
                  L 73.75 36.25
                  "
                  fill="none"
                  stroke="white"
                  strokeWidth="1rem"
                  strokeLinecap="round"
                />
              </>
            ),
            error: (
              <>
                <motion.path
                  d="M 31.25 31.75 L 68.75 68.75"
                  stroke="white"
                  strokeWidth="1rem"
                  strokeLinecap="round"
                  animate={animateHover}
                  transition={transitionHover}
                />
                <motion.path
                  d="M 68.75 31.75 L 31.25 68.75"
                  stroke="white"
                  strokeWidth="1rem"
                  strokeLinecap="round"
                  animate={animateHover}
                  transition={transitionHover}
                />
              </>
            ),
          }[status]
        }
      </StatusSVG>
      <h3>Want More Content?</h3>
      {
        {
          pending: <h4>Join my weekly newsletter below.</h4>,
          awaiting: <h4>Processing your email</h4>,
          confirmed: (
            <>
              <h4>Thank you, please confirm your subscription via the email we sent you.</h4>
              <p>Please check your spam folder if it doesn't arrive in the next few minutes.</p>
            </>
          ),
          error: <h4>Erm, sorry there was an error...</h4>,
        }[status]
      }

      <FormItems>
        <input type="text" placeholder="Please Enter Your Email Here..." name="email" required />
        <motion.button
          type="submit"
          whileHover={buttonHover}
          whileTap={buttonTap}
          onClick={handleSubmit}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
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
