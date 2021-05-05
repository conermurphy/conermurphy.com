import React from 'react';
import styled from 'styled-components';

const StatusContainer = styled.p`
  color: var(--accent);
  font-weight: bold;
`;

export function HireMe({ available }) {
  return <StatusContainer available={available}>{available ? 'Available to Hire' : 'Unavailable'}</StatusContainer>;
}
