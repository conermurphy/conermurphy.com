import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { GrCss3, GrHtml5, GrJs, GrReactjs, GrGatsbyjs, GrGraphQl, GrNode } from 'react-icons/gr';
import { motion } from 'framer-motion';

const LanguageIconContainer = styled(motion.div)`
  width: 2rem;
  height: 2rem;
  padding: 0.5rem;

  & > svg {
    width: 2rem;
    height: 2rem;

    & > path {
      stroke: inherit; // Now this is a hack.
    }
  }
`;

const LanguageIcons = ({ language }) => {
  console.log(language.trim());
  return (
    <LanguageIconContainer whileHover={{ scale: 1.2, rotate: '360deg' }} transition={{ duration: 1, ease: 'easeInOut' }}>
      {
        {
          HTML: <GrHtml5 style={{ stroke: '#E34C26' }} />,
          CSS: <GrCss3 style={{ stroke: 'rgb(38, 77, 228)' }} />,
          JavaScript: <GrJs style={{ backgroundColor: 'yellow' }} />,
          NodeJS: <GrNode style={{ color: 'rgb(68, 136, 62)' }} />,
          ReactJS: <GrReactjs style={{ color: '#61dafb' }} />,
          GatsbyJS: <GrGatsbyjs style={{ color: 'rgb(102 51 153' }} />,
          GraphQL: <GrGraphQl style={{ color: '#E10098' }} />,
        }[language.trim()]
      }
    </LanguageIconContainer>
  );
};

LanguageIcons.propTypes = {
  language: PropTypes.object.isRequired,
};

export default LanguageIcons;
