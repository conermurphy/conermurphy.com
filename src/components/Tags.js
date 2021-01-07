import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import findTagInfo from '../utils/findTagInfo';

const TagContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
`;

const TagStyle = styled.p`
  margin: 0;
  padding: 0.75rem 1rem;
  font-size: 1.2rem;
  background-color: var(--white);
  border: 1px solid var(--green);
`;

export default function Tags({ tags }) {
  return (
    <TagContainer>
      {tags.map((tag) => {
        const { matchingTag } = findTagInfo(tag);
        return <TagStyle key={`PostTag-${matchingTag}`}>{matchingTag}</TagStyle>;
      })}
    </TagContainer>
  );
}

Tags.propTypes = {
  tags: PropTypes.array,
};
