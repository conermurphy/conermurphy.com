import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { GrCss3, GrHtml5, GrJs, GrReactjs, GrGatsbyjs, GrGraphQl, GrNode } from 'react-icons/gr';
import { motion } from 'framer-motion';

const LanguageIconContainer = styled.div`
  position: relative;
`;

const IconContainer = styled(motion.div)`
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

const HoveredComponentText = styled.p`
  position: absolute;
  bottom: -25px;
  left: 0px;
  padding: 0.5rem;
  background-color: var(--body-font-color);
  color: var(--secondary-color);
  border-radius: 0.5rem;
  font-size: 0.75rem;
  margin: 0;
  z-index: 3;
`;

const LanguageIcons = ({ language }) => {
  const [hover, setHover] = useState(false);
  const [hoveredComponent, setHoveredComponent] = useState('');

  function handleHover(e) {
    setHover(true);
    setHoveredComponent(e.target.dataset.label);
  }

  function handleHoverLeave() {
    setHover(false);
  }

  return (
    <LanguageIconContainer>
      <IconContainer whileHover={{ scale: 1.2, rotate: '360deg' }} transition={{ duration: 1, ease: 'easeInOut' }}>
        {
          {
            HTML: (
              <GrHtml5
                style={{ stroke: 'hsl(12, 77%, 52%)' }}
                data-label="HTML"
                onMouseEnter={handleHover}
                onMouseLeave={handleHoverLeave}
              />
            ),
            CSS: (
              <GrCss3 style={{ stroke: 'rgb(38, 77, 228)' }} data-label="CSS" onMouseEnter={handleHover} onMouseLeave={handleHoverLeave} />
            ),
            JavaScript: (
              <GrJs
                style={{ backgroundColor: 'yellow' }}
                data-label="JavaScript"
                onMouseEnter={handleHover}
                onMouseLeave={handleHoverLeave}
              />
            ),
            NodeJS: (
              <GrNode
                style={{ color: 'rgb(68, 136, 62)' }}
                data-label="NodeJS"
                onMouseEnter={handleHover}
                onMouseLeave={handleHoverLeave}
              />
            ),
            ReactJS: (
              <GrReactjs style={{ color: '#61dafb' }} data-label="ReactJS" onMouseEnter={handleHover} onMouseLeave={handleHoverLeave} />
            ),
            GatsbyJS: (
              <GrGatsbyjs
                style={{ color: 'rgb(102 51 153' }}
                data-label="GatsbyJS"
                onMouseEnter={handleHover}
                onMouseLeave={handleHoverLeave}
              />
            ),
            GraphQL: (
              <GrGraphQl style={{ color: '#E10098' }} data-label="GraphQL" onMouseEnter={handleHover} onMouseLeave={handleHoverLeave} />
            ),
          }[language.trim()]
        }
      </IconContainer>
      {hover && <HoveredComponentText>{hoveredComponent}</HoveredComponentText>}
    </LanguageIconContainer>
  );
};

LanguageIcons.propTypes = {
  language: PropTypes.string.isRequired,
};

export default LanguageIcons;
