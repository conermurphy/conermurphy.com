import React from 'react';
import styled from 'styled-components';
import 'normalize.css';
import Typography from '../styles/Typography';
import GlobalStyles from '../styles/GlobalStyles';

const ContentStyles = styled.div`
  background: var(--white);
  padding: 2rem;
`;

export default function Layout({ children }) {
  return (
    <>
      <Typography />
      <GlobalStyles />
      <ContentStyles>{children}</ContentStyles>
    </>
  );
}
