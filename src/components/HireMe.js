import React from 'react';
import styled from 'styled-components';

const StatusContainer = styled.p`
  color: var(--primaryText);
  font-weight: bold;
  margin-top: 0;
`;

export function HireMe({ available }) {
  return <StatusContainer available={available}>{available ? 'Available to Hire' : 'Unavailable'}</StatusContainer>;
}
