import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import EmailSignupForm from '../emailSignupForm';
import GithubEdit from './GithubEdit';
import Navigation from './Navigation';

const Container = styled.div`
  margin: 5rem 0;

  @media (max-width: 400px) {
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
