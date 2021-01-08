import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import getFutureDate from '../utils/getFutureDate';

const CookieBannerContainer = styled.div`
  position: fixed;
  background-color: var(--grey);
  bottom: 20px;
  right: 20px;
  max-width: 400px;
  border-radius: 2rem;
  filter: drop-shadow(var(--shadow));
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: auto;

  @media (max-width: 400px) {
    max-width: 300px;
    right: 10%;
  }

  & > h2 {
    font-size: 2.3rem;
    padding: 2rem;
    font-weight: bold;
  }

  .textInformation {
    padding: 0 1rem;
    background-color: var(--white);
    margin-top: 0;

    a {
      font-weight: bold;
    }
  }

  .buttonsContainer {
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: var(--white);
    padding: 2rem 0;
    width: 100%;

    button {
      margin: 0 1rem;
      border: none;
      padding: 1rem 2rem;
      border-radius: var(--borderRadius);
      font-size: 1.6rem;
      font-weight: bold;
    }

    button.accept {
      background-color: var(--green);
      color: var(--white);
    }

    button.decline {
      background-color: var(--red);
    }
  }
`;

const newExpiry = getFutureDate(new Date(), 30); // Cookie expres in 30 days.

function onAccept() {
  document.cookie = `conermurphy.com_analytics=true; expires=${newExpiry}; path=/;`;
  document.cookie = 'ga-disable-G-L047KBCSG4=false; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  window.disableStr = '';
  location.reload();
}

function onDecline() {
  document.cookie.split('; ').forEach((cookie) => {
    if (cookie.includes('conermurphy.com')) {
      document.cookie = `${cookie.split('=')[0]}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  });

  document.cookie = `conermurphy.com_analytics=false; expires=${newExpiry}; path=/;`;
  location.reload();
}

export default function CookieBanner() {
  return (
    <CookieBannerContainer>
      <h2>🍪 Cookies</h2>
      <div className="textInformation">
        <p>
          This website uses cookies for analytical purposes if you're interested in reading more about the data we use and why you, please
          see our <Link to="/privacy-policy">Privacy Policy here.</Link>
        </p>
      </div>
      <div className="buttonsContainer">
        <button onClick={onAccept} className="accept" type="button">
          Accept
        </button>
        <button onClick={onDecline} className="decline" type="button">
          Decline
        </button>
      </div>
    </CookieBannerContainer>
  );
}
