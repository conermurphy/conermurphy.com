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

const LogoImg = styled.svg`
  height: ${props => props.height};
  fill: var(--body-font-color);
  transform: scale(1, -1);
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

  const languages = {
    HTML: (
      <GrHtml5
        style={{ stroke: 'hsl(12, 77%, 52%)' }}
        data-label="HTML"
        aria-label="HTML Icon"
        onMouseEnter={onDesktop ? handleHover : undefined}
        onMouseLeave={onDesktop ? handleHoverLeave : undefined}
      />
    ),
    CSS: (
      <GrCss3
        style={{ stroke: 'rgb(38, 77, 228)' }}
        data-label="CSS"
        aria-label="CSS Icon"
        onMouseEnter={onDesktop ? handleHover : undefined}
        onMouseLeave={onDesktop ? handleHoverLeave : undefined}
      />
    ),
    JavaScript: (
      <GrJs
        style={{ backgroundColor: 'yellow' }}
        data-label="JavaScript"
        aria-label="JavaScript Icon"
        onMouseEnter={onDesktop ? handleHover : undefined}
        onMouseLeave={onDesktop ? handleHoverLeave : undefined}
      />
    ),
    NodeJS: (
      <GrNode
        style={{ color: 'rgb(68, 136, 62)' }}
        data-label="NodeJS"
        aria-label="NodeJS Icon"
        onMouseEnter={onDesktop ? handleHover : undefined}
        onMouseLeave={onDesktop ? handleHoverLeave : undefined}
      />
    ),
    ReactJS: (
      <GrReactjs
        style={{ color: '#61dafb' }}
        data-label="ReactJS"
        aria-label="ReactJS Icon"
        onMouseEnter={onDesktop ? handleHover : undefined}
        onMouseLeave={onDesktop ? handleHoverLeave : undefined}
      />
    ),
    GatsbyJS: (
      <GrGatsbyjs
        style={{ color: 'rgb(102 51 153' }}
        data-label="GatsbyJS"
        aria-label="GatsbyJS Icon"
        onMouseEnter={onDesktop ? handleHover : undefined}
        onMouseLeave={onDesktop ? handleHoverLeave : undefined}
      />
    ),
    GraphQL: (
      <GrGraphQl
        style={{ color: '#E10098' }}
        data-label="GraphQL"
        aria-label="GraphQL Icon"
        onMouseEnter={onDesktop ? handleHover : undefined}
        onMouseLeave={onDesktop ? handleHoverLeave : undefined}
      />
    ),
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
        {Object.keys(languages).includes(language) ? (
          languages[language.trim()]
        ) : (
          <LogoImg
            version="1.1"
            xmlSpace="preserve"
            height="1rem"
            viewBox="0 0 600 600"
            data-label="Other"
            aria-label="Other"
            onMouseEnter={onDesktop ? handleHover : undefined}
            onMouseLeave={onDesktop ? handleHoverLeave : undefined}
          >
            <path
              style={{
                opacity: 1,
                fillOpacity: 1,
                stroke: 'none',
                strokeWidth: 37.5,
                strokeMiterlimit: 4,
                strokeDasharray: 'none',
                strokeOpacity: 1,
              }}
              d="m 172.21662,425.46608 c -69.18466,0 -125.468362,-56.2833 -125.468362,-125.46388 0,-69.18059 56.283702,-125.46826 125.468362,-125.46826 34.21695,0 66.18901,13.52454 90.02926,38.0874 l -28.79738,27.95508 c -16.21732,-16.69904 -37.96163,-25.8999 -61.23188,-25.8999 -47.05036,0 -85.325662,38.27532 -85.325662,85.32568 0,47.04633 38.275302,85.3213 85.325662,85.3213 19.6053,0 34.68203,-2.71297 50.40961,-9.0835 17.39355,-7.04892 33.91155,-18.32117 49.09717,-33.50684 l 87.8306,-87.82324 c 22.51962,-22.53165 59.16116,-22.52362 81.67676,0 l 0.87891,0.87598 70.99951,91.16601 v -159.5039 h 40.14258 V 377.9568 c 0,12.59652 -8.00443,23.80455 -19.91455,27.89502 -11.93018,4.10652 -25.1134,0.1606 -32.84473,-9.77051 L 412.11259,282.59693 c -6.91243,-6.16983 -17.54727,-5.93308 -24.17871,0.69434 l -87.8262,87.82618 c -19.00313,19.01121 -40.00538,33.2531 -62.4126,42.32519 -20.5326,8.31741 -40.72298,12.02344 -65.47846,12.02344 z"
            />
          </LogoImg>
        )}
      </IconContainer>
      {hover && <HoveredComponentText>{hoveredComponent}</HoveredComponentText>}
    </LanguageIconContainer>
  );
};

LanguageIcons.propTypes = {
  language: PropTypes.string.isRequired,
};

export default LanguageIcons;
