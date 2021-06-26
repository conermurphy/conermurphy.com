import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const StatusContainer = styled.p`
  color: var(--accent);
  font-weight: bold;
  margin-top: 0;
`;

export function HireMe({ available }) {
  return (
    <Link to="/contact">
      <StatusContainer available={available}>{available ? 'Available to Hire' : 'Unavailable for New Work'}</StatusContainer>
    </Link>
  );
}
