import React from 'react';
import styled from 'styled-components';
import EmailSignupForm from '../emailSignupForm';
import GithubEdit from './GithubEdit';
import Navigation from './Navigation';

const Container = styled.div`
  margin: 5rem 0;
`;

export default function ClosingComponents({ githubLinkInfo, pageContext }) {
  return (
    <Container>
      <EmailSignupForm />
      <GithubEdit githubLinkInfo={githubLinkInfo} />
      <Navigation pageContext={pageContext} />
    </Container>
  );
}
