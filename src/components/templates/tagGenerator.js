import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import tagJSON from '../../data/tags.json';

const StyledTag = styled(motion.p)`
  padding: 0.25rem 0.5rem;
  margin: 0.25rem 0.5rem;
  border-radius: 10px;
  font-weight: 600;
  background-color: ${props => (props.tagActive ? props.backgroundColor : 'var(--secondary-color)')};
  color: ${props => (props.tagActive ? props.color : 'var(--body-font-color)')};
  border: ${props => props.backgroundColor} 2px solid;
  transition: 0.2s all ease-in-out;

  :first-child {
    margin-left: 0;
  }
`;

const TagGenerator = ({ handleActive, language, active }) => {
  const languageTrim = language.trim();
  const languageToDisplay = tagJSON[languageTrim];

  return Object.keys(tagJSON).includes(languageTrim) ? (
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
  ) : (
    <StyledTag color="var(--header-font-color)" whileHover={{ scale: 0.95 }} transition={{ duration: 0.25, ease: 'easeInOut' }}>
      {languageTrim}
    </StyledTag>
  );
};

export default TagGenerator;

TagGenerator.propTypes = {
  handleActive: PropTypes.func,
  language: PropTypes.string.isRequired,
  active: PropTypes.bool,
};
