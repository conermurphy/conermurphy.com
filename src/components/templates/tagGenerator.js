import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import tagJSON from '../../data/tags.json';

const StyledTag = styled(motion.p)`
  padding: 0.25rem 0.5rem;
  margin: 0.25rem 0.5rem;
  border-radius: 10px;
  font-weight: 600;
  background-color: ${props => (props.tagActive ? props.backgroundColor : 'inherit')};
  color: ${props => (props.tagActive ? props.color : 'inherit')};
  border: ${props => props.backgroundColor} 2px solid;
  box-shadow: 0px 2px 2px var(--drop-shadows);
  transition: 0.2s all ease-in-out;
`;

const TagGenerator = ({ handleActive, language, active }) => {
  const languageTrim = language.trim();
  const languageToDisplay = tagJSON[languageTrim];

  return (
    <StyledTag
      tagActive={active}
      backgroundColor={languageToDisplay.backgroundColor}
      color={languageToDisplay.color}
      whileHover={{ scale: 0.95 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      onClick={handleActive}
    >
      {languageTrim}
    </StyledTag>
  );
};

export default TagGenerator;

TagGenerator.propTypes = {
  language: PropTypes.string.isRequired,
  active: PropTypes.bool,
};
