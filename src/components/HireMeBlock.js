import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.p`
  display: flex;
  flex-direction: ${(props) => (props.layout === 'column' ? 'column' : 'row')};
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
`;

const StatusContainer = styled.span`
  padding: 0.75rem 1.25rem;
  border-radius: 5px;
  background-color: ${(props) => (props.available ? 'var(--green)' : 'var(--red)')};
  font-weight: bold;
`;

export default function HireMeBlock({ available, layout }) {
  return (
    <Container layout={layout}>
      Current Status: <StatusContainer available={available}>{available ? 'Available to Hire' : 'Unavailable'}</StatusContainer>
    </Container>
  );
}

HireMeBlock.propTypes = {
  available: PropTypes.bool.isRequired,
  layout: PropTypes.string.isRequired,
};
