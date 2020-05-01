import React from 'react';
import styled from 'styled-components';
import { FaTwitterSquare, FaInstagramSquare, FaGithubSquare, FaLinkedin, FaEnvelopeSquare } from 'react-icons/fa';
import Layout from '../components/layout';
import { useSiteMetadata } from '../hooks/use-site-metadata';
import Logo from '../components/logo';

const PageContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ContactLinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;

  & > a > svg {
    font-size: 5vh;
  }
`;

const Index = () => {
  const { title, description } = useSiteMetadata();
  return (
    <Layout>
      <PageContainer>
        <Logo height="15vh" />
        <h1>{title}</h1>
        <h2>{description}</h2>
        <ContactLinkContainer>
          <a href="https://twitter.com/MrConerMurphy" aria-label="Twitter">
            <FaTwitterSquare />
          </a>
          <a href="https://www.instagram.com/mrconermurphy/" aria-label="Instagram">
            <FaInstagramSquare />
          </a>
          <a href="https://github.com/conermurphy" aria-label="Github">
            <FaGithubSquare />
          </a>
          <a href="https://www.linkedin.com/in/coner-murphy/" aria-label="Linkedin">
            <FaLinkedin />
          </a>
          <a href="mailto:coner@conermurphy.com" aria-label="Email">
            <FaEnvelopeSquare />
          </a>
        </ContactLinkContainer>
      </PageContainer>
    </Layout>
  );
};

export default Index;
