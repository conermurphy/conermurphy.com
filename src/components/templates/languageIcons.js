import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { GrCss3, GrHtml5, GrJs, GrReactjs, GrGatsbyjs, GrGraphQl, GrNode } from 'react-icons/gr';

const LanguageIcons = ({ language }) => {
  console.log(language);
  return (
    <div>
      {
        {
          HTML: <GrHtml5 />,
          CSS: <GrCss3 />,
          JavaScript: <GrJs />,
          Node: <GrNode />,
          React: <GrReactjs />,
          Gatsby: <GrGatsbyjs />,
          GraphQL: <GrGraphQl />,
        }[language]
      }
    </div>
  );
};

LanguageIcons.propTypes = {
  language: PropTypes.object.isRequired,
};

export default LanguageIcons;
