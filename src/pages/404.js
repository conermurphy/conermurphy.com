import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Page404() {
  return (
    <Container>
      <div className="headerTitleSeperator">
        <h1>404</h1>
      </div>
      <p>
        Looks like you hit a page that doesn't exist. If you think this is an error, please <Link to="/#aboutMe">Contact me</Link>
      </p>
    </Container>
  );
}
