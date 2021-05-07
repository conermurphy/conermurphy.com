import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import GithubEdit from './GithubEdit';
import Navigation from './Navigation';
import { EmailSignupForm } from './EmailSignupForm';

const Container = styled.div`
  margin: 5rem 0;

  @media (max-width: 600px) {
    margin: 0;
    margin-top: 5rem;
  }
`;

export default function ClosingComponents({ fileAbsolutePath, pageContext }) {
  return (
    <Container>
      <EmailSignupForm />
      <GithubEdit postURL={fileAbsolutePath} />
      <Navigation pageContext={pageContext} />
    </Container>
  );
}

ClosingComponents.propTypes = {
  fileAbsolutePath: PropTypes.string,
  pageContext: PropTypes.object,
};
