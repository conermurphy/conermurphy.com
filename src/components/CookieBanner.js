import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import getFutureDate from '../utils/getFutureDate';

const CookieBannerContainer = styled.div`
  position: fixed;
  background-color: var(--white);
  top: 100px;
  max-width: 600px;
  border-radius: var(--borderRadius);
  filter: drop-shadow(var(--shadow));
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-top: 0.5rem solid var(--green);
  overflow: hidden;

  & > h2 {
    font-size: 2.3rem;
    margin: 2rem;
    font-weight: bold;
  }

  .textInformation {
    overflow-y: scroll;
    overflow-x: hidden;
    max-height: 400px;
    padding: 1rem;
    margin: 2rem;
    margin-top: 0;
    -moz-box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.12);
    -webkit-box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.12);
    box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.12);

    scrollbar-width: thin;
    ::-webkit-scrollbar {
      width: var(--scrollBarWidth);
    }
  }

  .buttonsContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--grey);
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
      color: var(--grey);
    }

    button.decline {
      background-color: var(--red);
    }
  }
`;

const newExpiry = getFutureDate(new Date(), 30); // Cookie expres in 30 days.

function onAccept() {
  document.cookie = `conermurphy.com_analytics=true; expires=${newExpiry};`;
  document.cookie = 'ga-disable-G-L047KBCSG4=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
  location.reload();
}

function onDecline() {
  document.cookie.split('; ').forEach((cookie) => {
    if (cookie.includes('conermurphy.com')) {
      document.cookie = `${cookie.split('=')[0]}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
    }
  });

  document.cookie = `conermurphy.com_analytics=false; expires=${newExpiry};`;
  location.reload();
}

export default function CookieBanner() {
  return (
    <CookieBannerContainer>
      <h2>Cookies:</h2>
      <div className="textInformation">
        <p>
          I know, I know. It's another annoying cookie pop-up banner. Not wanting to get into the topic of whether these are right or wrong
          and how they impact the user experience for the end-user, I'll keep this quick and to the point.
        </p>
        <p>
          In order to comply with EU law and GDPR regulations <a href="https://gdpr.eu/what-is-gdpr/">(read more here)</a>, all websites
          must ask for the end-users permissions before adding any non-essential cookies to the end-users machines, my website is no
          different so this is me asking you for your permission, below is a quick summary of the cookies I use.
        </p>
        <p>
          If you're interested in reading more, you can read my <Link to="/privacy-policy">Privacy Policy here.</Link>
        </p>
        <h3>Cookies:</h3>
        <div>
          <p>
            <strong>Google Analytics:</strong>
          </p>
          <p>
            I use Google Analytics for tracking users activities on my website to see how different pages, blog posts and notes are
            performing. From this information I can improve future posts and notes to perform better.
          </p>
        </div>
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
