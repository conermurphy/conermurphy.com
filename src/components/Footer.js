import React from 'react';
import styled from 'styled-components';
import { FaEnvelope, FaTwitter, FaLocationArrow } from 'react-icons/fa';
import { Link } from 'gatsby';
import { EmailSignup } from './emailSignupForm';
import Logo from './Logo';
import ContactIcons from './ContactIcons';
import Twitter from './Twitter';

const FooterBody = styled.footer`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: var(--black);
  color: var(--white);

  .copyright {
    .credits,
    a {
      font-size: 1.2rem;
      color: var(--white);
    }
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, max-content));
  align-items: flex-start;
  justify-content: center;
  text-align: center;
  margin: 5rem 0;

  & > div {
    display: grid;
    grid-template-rows: auto 2rem 1fr;
    align-items: center;
    justify-items: center;
    gap: 2rem;

    & > h5 {
      font-size: 1.9rem;
      margin: 2rem 0;

      span {
        white-space: nowrap;
        display: block;
        margin: 0.5rem;
      }
    }

    .icon {
      margin: 1rem 0;
      display: flex;
      align-items: center;
      justify-content: center;
      fill: var(--white);

      & > svg {
        margin: 0;
        font-size: 2.5rem;
      }
    }
  }
`;

const NavigationLinks = styled.ul`
  * {
    color: var(--white);
    text-decoration: underline;
  }
`;

export default function Footer() {
  return (
    <FooterBody>
      <ContentGrid>
        <div>
          <div className="icon">
            <Logo height="3rem" link />
          </div>
          <h5>Coner Murphy</h5>
          <ContactIcons />
        </div>
        <div>
          <div className="icon">
            <FaLocationArrow />
          </div>
          <h5>Navigation</h5>
          <NavigationLinks>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/notes">Notes</Link>
            </li>
            <li>
              <Link to="/portfolio">Portfolio</Link>
            </li>
            <li>
              <Link to="/reads">Reads</Link>
            </li>
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
          </NavigationLinks>
        </div>
        <div>
          <div className="icon">
            <FaTwitter />
          </div>
          <h5>
            Tweets:
            <span>@MrConerMurphy</span>
          </h5>
          <Twitter />
        </div>
        <div>
          <div className="icon">
            <FaEnvelope />
          </div>
          <h5>Stay up to the date with my latest content:</h5>
          <EmailSignup />
        </div>
      </ContentGrid>
      <div className="copyright">
        <p className="center credits">
          Icons Used : <a href="	https://fontawesome.com/">Font Awesome</a>,{' '}
          <a href="http://google.github.io/material-design-icons/">Material Design</a>,{' '}
          <a href="https://github.com/grommet/grommet-icons">Grommet-Icons</a> & <a href="https://ionicons.com/">Ionicons</a> from{' '}
          <a href="https://react-icons.github.io/react-icons">React Icons</a>
        </p>
        <p className="center">&copy; Coner Murphy {new Date().getFullYear()}</p>
      </div>
    </FooterBody>
  );
}
