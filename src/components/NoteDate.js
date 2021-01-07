import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const DateContainer = styled.p`
  display: grid;
  grid-template-rows: repeat(auto-fit, min-content);
  justify-items: center;
  align-items: center;
  position: relative;
  justify-self: center;
  width: 7.5rem;
  padding: 0;

  ::after,
  ::before {
    display: block;
    position: absolute;
    width: 2.5rem;
    height: 2.5rem;
    content: '';
  }

  ::after {
    top: -10px;
    right: -10px;
    border-top: 2px solid var(--black);
    border-right: 2px solid var(--black);
  }

  ::before {
    bottom: -10px;
    left: -10px;
    border-bottom: 2px solid var(--black);
    border-left: 2px solid var(--black);
  }

  & > span {
    font-size: 2.5rem;
  }
`;

export default function NoteDate({ date }) {
  return (
    <DateContainer>
      <span>{date.slice(0, 4)}</span>
      <span>{date.slice(4, 8)}</span>
    </DateContainer>
  );
}

NoteDate.propTypes = {
  date: PropTypes.string,
};
