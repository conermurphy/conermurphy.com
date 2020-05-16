import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { GrCss3, GrHtml5, GrJs, GrReactjs, GrGatsbyjs, GrGraphQl, GrNode } from 'react-icons/gr';
import { motion } from 'framer-motion';
import device from '../device';

const LanguageIconContainer = styled.div`
  position: relative;
`;

const IconContainer = styled(motion.button)`
  width: 2rem;
  height: 2rem;
  -webkit-appearance: none;
  background-color: transparent;
  border: none;
  transform: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0 0.5rem;

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

  let onDesktop = null;

  if (typeof window !== 'undefined') {
    onDesktop = window.matchMedia(device.desktop).matches;
  }

  const handleKeyPress = e => {
    setHover(!hover);
    setHoveredComponent(e.currentTarget.children[0].dataset.label);
  };

  const handleHover = e => {
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
        onKeyPress={handleKeyPress}
        animate={tap ? 'clicked' : 'notClicked'}
        variants={variants}
      >
        {
          {
            HTML: (
              <GrHtml5
                style={{ stroke: 'hsl(12, 77%, 52%)' }}
                data-label="HTML"
                onMouseEnter={onDesktop ? handleHover : undefined}
                onMouseLeave={onDesktop ? handleHoverLeave : undefined}
              />
            ),
            CSS: (
              <GrCss3
                style={{ stroke: 'rgb(38, 77, 228)' }}
                data-label="CSS"
                onMouseEnter={onDesktop ? handleHover : undefined}
                onMouseLeave={onDesktop ? handleHoverLeave : undefined}
              />
            ),
            JavaScript: (
              <GrJs
                style={{ backgroundColor: 'yellow' }}
                data-label="JavaScript"
                onMouseEnter={onDesktop ? handleHover : undefined}
                onMouseLeave={onDesktop ? handleHoverLeave : undefined}
              />
            ),
            NodeJS: (
              <GrNode
                style={{ color: 'rgb(68, 136, 62)' }}
                data-label="NodeJS"
                onMouseEnter={onDesktop ? handleHover : undefined}
                onMouseLeave={onDesktop ? handleHoverLeave : undefined}
              />
            ),
            ReactJS: (
              <GrReactjs
                style={{ color: '#61dafb' }}
                data-label="ReactJS"
                onMouseEnter={onDesktop ? handleHover : undefined}
                onMouseLeave={onDesktop ? handleHoverLeave : undefined}
              />
            ),
            GatsbyJS: (
              <GrGatsbyjs
                style={{ color: 'rgb(102 51 153' }}
                data-label="GatsbyJS"
                onMouseEnter={onDesktop ? handleHover : undefined}
                onMouseLeave={onDesktop ? handleHoverLeave : undefined}
              />
            ),
            GraphQL: (
              <GrGraphQl
                style={{ color: '#E10098' }}
                data-label="GraphQL"
                onMouseEnter={onDesktop ? handleHover : undefined}
                onMouseLeave={onDesktop ? handleHoverLeave : undefined}
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
