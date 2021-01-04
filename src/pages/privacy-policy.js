import React from 'react';
import styled from 'styled-components';
import { promptUserReconfirm } from '../utils/checkForAnalyticsCookie';
import useNavTheme from '../utils/useNavTheme';

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
  useNavTheme('dark');
  return (
    <PrivacyPolicyContainer>
      <div className="headerTitleSeperator">
        <h1>Privacy Policy</h1>
      </div>
      <p>
        <i>Last Updated: 04/01/2021</i>
      </p>
      <p>
        If you wish to update your cookie consent choice,{' '}
        <button onClick={() => promptUserReconfirm()} type="button">
          please click here.
        </button>{' '}
      </p>
      <p>
        No one enjoys reading legal documents or terms and conditions but unfortunately, things like these are needed in the world and with
        legislation such as the GDPR <a href="https://gdpr.eu/what-is-gdpr/">(which you can read more about here)</a> becoming all more
        common in the world, web developers like myself need to do ensure they do their part to help maintain user's privacy and security.
      </p>
      <h2>Overview</h2>
      <p>
        I don't plan on making this a long-winded document that will cause most people to switch off before they get to the truly important
        information. For this reason, I'm going to make this as concise as possible will also still addressing all of the required points.
      </p>
      <p>So, without further or do let's get into it...</p>
      <h2>Introduction</h2>
      <p>
        Hi, welcome to my website. I'm Coner and this website (conermurphy.com) is my portfolio and blog for all of the content I create and
        share with the world. This ranges from things like blog posts and notes to my portfolio of work including both personal projects and
        projects from previous clients.
      </p>
      <h2>Information Collected</h2>
      <p>
        My website serves purely as an information source for users to use to learn, develop and be inspired for their next project. There
        is also some optional functionality included in the form of email newsletter signup forms which allow me to collect a users email
        address onto my email newsletter for future communication but this is completely optional.
      </p>
      <p>
        Website analytics have also been included on this website in the form of Google Analytics but this is completely optional and as per
        regulation is on an opt-in only basis. If you choose to ignore or decline the cookie popup shown on entry to the website then only
        cookies stating the refusal are added. More information is given on this below.
      </p>
      <h2>Collection Method</h2>
      <p>There are 2 forms of data collection used on this website, these are detailed below:</p>
      <p>
        <strong>Manual:</strong> A user can optionally decide to sign up for my newsletter this is hosted on{' '}
        <a href="https://convertkit.com/">ConvertKit</a>, therefore if a user decides to signup for my newsletter using the included forms
        on this website their information ( email address ) would be shared and stored on ConvertKit's infrastructure. If you are interested
        in reading more about their privacy policy, <a href="https://convertkit.com/privacy">you can so here.</a>
      </p>
      <p>
        <strong>Automatic:</strong> Should a user accept the cookie policy displayed upon entry to this website then the relevant cookies
        will be set on the user's browser to allow for communication with Google Analytics which is the analytics service being used on this
        website. This can be reviewed at any time by{' '}
        <button onClick={() => promptUserReconfirm()} type="button">
          clicking here.
        </button>
      </p>
      <h2>Storage Information</h2>
      <p>
        This website does not use any internal databases for the storage of information collected on this website. But, data is stored by
        third parties with the user's consent. This is Google Analytics and ConvertKit, the relevant collected information is collected and
        stored on the correspondings companies infrastructure to allow for the carrying out of the desired service.
      </p>
      <p>
        Following this, information is stored into the user's browser via cookies. This is to record the user's choice in regards to the
        collection of analytics on the website. By default, all analytics is disabled on the website until the user approves the collection
        of the data. If the user ignores the cookie popup or declines the request then no analytics will be recorded.
      </p>
      <p>Below is a breakdown of the cookies used on this website:</p>
      <ul>
        <li>
          <strong>conermurphy.com_analytics=promptUser:</strong> This cookie is set by default when a new user visits the website and is
          used to trigger the prompt for a reply to the cookie policy which then sets some of the below cookies depending on the decision.
          If a user decides to change their response by using one of the buttons above this cookie will also be set to trigger the prompt.
        </li>
        <li>
          <strong>conermurphy.com_analytics=false:</strong> If a user declines the use of analytics and cookies on this website then this
          cookie is set so that on future visits the website will not prompt the user for confirmation and it will also opt the user
          automatically out of Google Analytics on page load. This cookie lasts 30 days before expiring, if a user does not revisit within
          30 days then they will be prompted for consent again on their next visit.
        </li>
        <li>
          <strong>ga-disable-G-L047KBCSG4=true:</strong> If a user declines the use of analytics and cookies on this website then this
          cookie is set so that on future visits the website will not prompt the user for confirmation and it will also opt the user
          automatically out of Google Analytics on page load. This cookie is also set when the cookie "conermurphy.com_analytics=promptUser"
          is being used to prevent the collection of analytics data.
        </li>
        <li>
          <strong>conermurphy.com_analytics=true:</strong> If a user accepts the use of Google Analytics then this cookie is set to remember
          this choice and allow for Google Analytics to collect data on this visit and subsequent ones. This cookie also has a 30 day
          expiration time on it so if a user does not revisit within that time then they will be prompted for confirmation again on their
          next visit.
        </li>
        <li>
          <strong>conermurphy.com_ga=GA1.1.1065468216.1609791686:</strong> This cookie is automatically set by Google Analytics and is only
          set once the user has accepted to the use of cookies on the website. If declined this cookie is never set on the page.
        </li>
        <li>
          <strong>conermurphy.com_ga_L047KBCSG4=GS1.1.1609791685.1.1.1609791691.0:</strong> This cookie is automatically set by Google
          Analytics and is only set once the user has accepted to the use of cookies on the website. If declined this cookie is never set on
          the page.
        </li>
      </ul>
      <p>
        Should you wish to change your choice in regards to cookies then you may do so by{' '}
        <button onClick={() => promptUserReconfirm()} type="button">
          clicking here.
        </button>
      </p>
      <h2>Contact Details</h2>
      <p>Should you wish to change your preference for the use of cookies on this website, you may do it via one of the above links.</p>
      <p>
        However, if you still have questions or wish to discuss a matter further you can contact me by emailing:{' '}
        <a href="mailto:coner@conermurphy.com">coner@conermurphy.com</a>
      </p>
    </PrivacyPolicyContainer>
  );
}
