import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { GrCss3, GrHtml5, GrJs, GrReactjs, GrGatsbyjs, GrGraphQl, GrNode } from 'react-icons/gr';

const LanguageIconContainer = styled.div`
  width: 2rem;
  height: 2rem;
  padding: 0.5rem;
  & > svg {
    width: 2rem;
    height: 2rem;
  }
`;

const LanguageIcons = ({ language }) => {
  console.log(language.trim());
  return (
    <LanguageIconContainer>
      {
        {
          HTML: <GrHtml5 />,
          CSS: <GrCss3 />,
          JavaScript: <GrJs style={{ backgroundColor: 'yellow' }} />,
          NodeJS: <GrNode />,
          ReactJS: <GrReactjs />,
          GatsbyJS: <GrGatsbyjs style={{ color: 'rgb(102 51 153' }} />,
          GraphQL: <GrGraphQl />,
        }[language.trim()]
      }
    </LanguageIconContainer>
  );
};

LanguageIcons.propTypes = {
  language: PropTypes.object.isRequired,
};

export default LanguageIcons;
