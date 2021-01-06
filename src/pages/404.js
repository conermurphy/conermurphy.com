import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import useNavTheme from '../utils/useNavTheme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function () {
  useNavTheme('dark');
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
