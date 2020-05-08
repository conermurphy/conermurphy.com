import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { FaTwitter, FaInstagram, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import Layout from '../components/layout';
import { useSiteMetadata } from '../hooks/use-site-metadata';
import Logo from '../components/logo';
import CornerArt from '../components/templates/cornerArt';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 2rem;
  padding-top: 0;
  margin-bottom: 0;
  background-color: var(--secondary-color);
  position: relative;

  & > a {
    border: 2px solid var(--header-font-color);
    border-radius: 0.5rem;
    padding: 0.5rem;
    margin: 2rem 0 0rem 0;
  }
`;

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 1rem 2rem;
`;

const ContactContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
`;

const ContactContent = styled.div`
  padding: 1rem 2rem;
  background-color: var(--secondary-color);
`;

const ContactIconContainer = styled.div`
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex=start;
  background-color: var(--background-color);

  & > a {
    display: flex;
    flex-direction: row;
    align-items: center;

    & > svg {
      height: 1rem;
      width: 1rem;
      border: 2px solid var(--body-font-color);
      border-radius: 0.5rem;
      padding: 1rem;
      margin: 1rem 1rem 0 0;
    }
  }
`;

const Index = () => {
  const { title, description } = useSiteMetadata();
  const listDescription = description.split(',');
  return (
    <Layout>
      <PageContainer>
        <h1>{title}</h1>
        {listDescription.map(item => (
          <h2 style={{ marginBottom: 0, fontSize: '1.2rem', fontWeight: 400 }}>{item}</h2>
        ))}
        <Link>Contact Me</Link>
        <CornerArt adjustments={[2.5, 0, 0, 0]} />
      </PageContainer>
      <AboutContainer id="about">
        <h3>About Me</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus suscipit sed magna vitae facilisis. Nullam et arcu vitae enim
          mollis laoreet non id leo. Suspendisse sollicitudin leo nec velit pulvinar, nec pretium quam mollis. Nulla a neque eu nulla
          sollicitudin maximus malesuada a sem. Phasellus sodales mauris id dui fermentum eleifend. Maecenas commodo egestas quam quis
          commodo. Vivamus pretium ex varius congue pharetra. Etiam cursus cursus diam, sit amet condimentum nibh blandit eget. Curabitur
          egestas dignissim ante vitae placerat. Etiam sit amet mauris vitae turpis accumsan convallis. Nulla vel justo metus.
        </p>
      </AboutContainer>
      <ContactContainer id="contact">
        <ContactContent>
          <h3>Let's Chat!</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus suscipit sed magna vitae facilisis. Nullam et arcu vitae enim
            mollis laoreet non id leo. Suspendisse sollicitudin leo nec velit pulvinar, nec pretium quam mollis. Nulla a neque eu nulla
            sollicitudin maximus malesuada a sem. Phasellus sodales mauris id dui fermentum eleifend.
          </p>
        </ContactContent>
        <ContactIconContainer>
          <a href="https://twitter.com/MrConerMurphy" aria-label="Twitter">
            <FaTwitter />
            <p>@MrConerMurphy</p>
          </a>
          <a href="https://www.instagram.com/mrconermurphy/" aria-label="Instagram">
            <FaInstagram />
            <p>@MrConerMurphy</p>
          </a>
          <a href="https://github.com/conermurphy" aria-label="Github">
            <FaGithub />
            <p>Coner Murphy</p>
          </a>
          <a href="https://www.linkedin.com/in/coner-murphy/" aria-label="Linkedin">
            <FaLinkedin />
            <p>HConer Murphy</p>
          </a>
          <a href="mailto:coner@conermurphy.com" aria-label="Email">
            <FaEnvelope />
            <p>coner@conermurphy.com</p>
          </a>
        </ContactIconContainer>
      </ContactContainer>
    </Layout>
  );
};

export default Index;
