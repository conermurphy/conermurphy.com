import React from 'react';
import styled from 'styled-components';

const CookieBannerContainer = styled.div`
  position: fixed;
  background-color: var(--white);
  top: 100px;
  padding: 3rem 5rem;
  max-width: 600px;
  border-radius: var(--borderRadius);
  filter: drop-shadow(var(--shadow));
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;

  .textInformation {
    overflow-y: scroll;
    overflow-x: hidden;
    max-height: 400px;
    padding: 1rem;
    margin: 2rem 0;
    border: 1px solid var(--black);
  }

  .buttonsContainer {
    padding: 2rem;

    button {
      margin: 0 1rem;
      border: none;
      padding: 1rem 2rem;
      border-radius: var(--borderRadius);
      font-size: 1.6rem;
    }

    button.accept {
      background-color: var(--green);
    }

    button.decline {
      background-color: var(--red);
    }
  }
`;

function onAccept() {
  document.cookie = 'conermurphy.com_analytics=true; expires=Fri, 31 Dec 9999 23:59:59 GMT;';
  document.cookie = 'ga-disable-G-L047KBCSG4=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
  location.reload();
}

function onDecline() {
  document.cookie.split('; ').forEach((cookie) => {
    if (cookie.includes('conermurphy.com')) {
      document.cookie = `${cookie.split('=')[0]}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
    }
  });
  document.cookie = 'conermurphy.com_analytics=false; expires=Fri, 31 Dec 9999 23:59:59 GMT';
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
          In order to comply with EU law and GDPR regulations <a href="">(read more here)</a>, all websites must ask for the end-users
          permissions before adding any non-essential cookies to the end-users machines, my website is no different so this is me asking you
          for your permission, below is a quick summary of the cookies I use.
        </p>
        <p>
          If you're interested in reading more, you can read my <a href="">Privacy Policy here.</a>
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
      <h3>Accept / Decline Cookies:</h3>
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
