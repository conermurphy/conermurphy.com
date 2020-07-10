import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import tagJSON from '../../data/tags.json';

const StyledTag = styled.p`
  padding: 0.25rem 0.5rem;
  margin: 0.25rem 0.5rem;
  border-radius: 10px;
  font-weight: 600;
  background-color: ${props => props.backgroundColor};
  color: ${props => props.color};
  box-shadow: 0px 2px 2px var(--drop-shadows);
`;

const TagGenerator = ({ language }) => {
  const languageTrim = language.trim();
  const languageToDisplay = tagJSON[languageTrim];

  return (
    <StyledTag backgroundColor={languageToDisplay.backgroundColor} color={languageToDisplay.color}>
      #{languageTrim}
    </StyledTag>
  );
};

export default TagGenerator;

TagGenerator.propTypes = {
  language: PropTypes.string.isRequired,
};
