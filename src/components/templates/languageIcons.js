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
  const [tap, setTap] = useState(false);

  const onDesktop = window.matchMedia('(max-width: 1024px)').matches;
  console.log(onDesktop);

  const handleHover = e => {
    console.log(e.currentTarget.dataset.label);
    setHover(true);
    setHoveredComponent(e.currentTarget.dataset.label);
  };

  function handleHoverLeave() {
    setHover(false);
  }

  const handleTap = () => {
    setTap(!tap);
  };

  const variants = {
    clicked: { scale: 1.25 },
    notClicked: { scale: 1 },
  };

  return (
    <LanguageIconContainer>
      <IconContainer
        whileHover={{ scale: 0.8 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        onClick={handleTap}
        animate={tap ? 'clicked' : 'notClicked'}
        variants={variants}
      >
        {
          {
            HTML: (
              <GrHtml5
                style={{ stroke: 'hsl(12, 77%, 52%)' }}
                data-label="HTML"
                onMouseEnter={onDesktop ? undefined : handleHover}
                onMouseLeave={onDesktop ? undefined : handleHoverLeave}
              />
            ),
            CSS: (
              <GrCss3
                style={{ stroke: 'rgb(38, 77, 228)' }}
                data-label="CSS"
                onMouseEnter={onDesktop ? undefined : handleHover}
                onMouseLeave={onDesktop ? undefined : handleHoverLeave}
              />
            ),
            JavaScript: (
              <GrJs
                style={{ backgroundColor: 'yellow' }}
                data-label="JavaScript"
                onMouseEnter={onDesktop ? undefined : handleHover}
                onMouseLeave={onDesktop ? undefined : handleHoverLeave}
              />
            ),
            NodeJS: (
              <GrNode
                style={{ color: 'rgb(68, 136, 62)' }}
                data-label="NodeJS"
                onMouseEnter={onDesktop ? undefined : handleHover}
                onMouseLeave={onDesktop ? undefined : handleHoverLeave}
              />
            ),
            ReactJS: (
              <GrReactjs
                style={{ color: '#61dafb' }}
                data-label="ReactJS"
                onMouseEnter={onDesktop ? undefined : handleHover}
                onMouseLeave={onDesktop ? undefined : handleHoverLeave}
              />
            ),
            GatsbyJS: (
              <GrGatsbyjs
                style={{ color: 'rgb(102 51 153' }}
                data-label="GatsbyJS"
                onMouseEnter={onDesktop ? undefined : handleHover}
                onMouseLeave={onDesktop ? undefined : handleHoverLeave}
              />
            ),
            GraphQL: (
              <GrGraphQl
                style={{ color: '#E10098' }}
                data-label="GraphQL"
                onMouseEnter={onDesktop ? undefined : handleHover}
                onMouseLeave={onDesktop ? undefined : handleHoverLeave}
              />
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
