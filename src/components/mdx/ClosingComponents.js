import React from 'react';
import styled from 'styled-components';
import EmailSignupForm from '../emailSignupForm';
import GithubEdit from './GithubEdit';

const Container = styled.div`
  margin: 5rem 0;
`;

export default function ClosingComponents({ githubLinkInfo }) {
  return (
    <Container>
      <EmailSignupForm />
      <GithubEdit githubLinkInfo={githubLinkInfo} />
    </Container>
  );
}
