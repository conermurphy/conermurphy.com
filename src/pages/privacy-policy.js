import React from 'react';
import styled from 'styled-components';

const PrivacyPolicyContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5rem;

  & > h2 {
    border-top: 2px solid var(--grey);
    padding-top: 1rem;
  }

  button {
    background-color: none;
    background: none;
    border: none;
    margin: 0;
    padding: 0;
    text-decoration: underline;
    font-weight: bold;
    cursor: pointer;
  }
`;

export default function PrivacyPolicy() {
  if (typeof window !== 'undefined') {
    return (
      <PrivacyPolicyContainer>
        <div className="headerTitleSeperator">
          <h1>Privacy Policy</h1>
        </div>
        <p>
          <i>Last Updated: 13/03/2021</i>
        </p>
        <p>
          If you wish to opt-out of Google Analytics,{' '}
          <button onClick={() => window.gaOptout()} type="button">
            please click here.
          </button>{' '}
        </p>
        <p>
          No one enjoys reading legal documents or terms and conditions but unfortunately, things like these are needed in the world and
          with legislation such as the GDPR <a href="https://gdpr.eu/what-is-gdpr/">(which you can read more about here)</a> becoming all
          more common in the world, web developers like myself need to do ensure they do their part to help maintain user's privacy and
          security.
        </p>
        <h2>Overview</h2>
        <p>
          I don't plan on making this a long-winded document that will cause most people to switch off before they get to the truly
          important information. For this reason, I'm going to make this as concise as possible will also still addressing all of the
          required points.
        </p>
        <h2>Introduction</h2>
        <p>
          Hi, welcome to my website. I'm Coner and this website (conermurphy.com) is my portfolio and blog for all of the content I create
          and share with the world. This ranges from things like blog posts and notes to my portfolio of work including both personal
          projects and projects from previous clients.
        </p>
        <h2>Information Collected</h2>
        <p>
          My website serves purely as an information source for users to use to learn, develop and be inspired for their next project. There
          is also some optional functionality included in the form of email newsletter signup forms which allow me to collect a users email
          address onto my email newsletter for future communication but this is completely optional.
        </p>
        <p>
          Website analytics have also been included on this website in the form of Google Analytics. This has been configured with all
          advertising, IP tracking, and demographics collection features turned off. No personal data is shared with Google Analytics.
        </p>
        <h2>Collection Method</h2>
        <p>There are 2 forms of data collection used on this website, these are detailed below:</p>
        <p>
          <strong>Manual:</strong> A user can optionally decide to sign up for my newsletter this is hosted on{' '}
          <a href="https://convertkit.com/">ConvertKit</a>, therefore if a user decides to signup for my newsletter using the included forms
          on this website their information ( email address, name, and IP address ) would be shared and stored on ConvertKit's
          infrastructure. If you are interested in reading more about their privacy policy,{' '}
          <a href="https://convertkit.com/privacy">you can so here.</a>
        </p>
        <p>
          <strong>Automatic:</strong> Google Analytics automatically sets some cookies to track page views but as mentioned above all
          advertising, IP tracking, and demographics collection features turned off so no personal data is sent to Google Analytics.
        </p>
        <h2>Storage Information</h2>
        <p>
          This website does not use any databases for the storage of information collected on this website. But, data is stored by third
          parties with the user's consent. This is for ConvertKit, the relevant collected information is collected and stored on the
          companies infrastructure to allow for the carrying out of the desired service.
        </p>
        <h2>Cookies</h2>
        <p>
          This website uses functional cookies. Meaning you won’t be haunted around the internet with ads by any of the cookies used on this
          site.
        </p>
        <p>
          If you wish to opt-opt of Google Analytics{' '}
          <button onClick={() => window.gaOptout()} type="button">
            {' '}
            please click here.
          </button>
        </p>
        <h2>Your Rights</h2>
        <p>
          You have the right to access, rectify, erase, restrict processing, object to processing, or export personal data you share with
          us. If you would like to exercise these rights, please contact me.
        </p>
        <h2>Contact Details</h2>
        <p>Should you wish to change your preference for the use of cookies on this website, you may do it via one of the above links.</p>
        <p>
          However, if you still have questions or wish to discuss a matter further you can contact me by emailing:{' '}
          <a href="mailto:privacy@conermurphy.com">privacy@conermurphy.com</a>
        </p>
      </PrivacyPolicyContainer>
    );
  }
  return null;
}
