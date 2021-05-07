import { motion } from 'framer-motion';
import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 5rem 0;
  gap: 2.5rem;
  text-align: center;

  & > h2 {
    font-size: 2.5rem;
    margin-top: 0;
    max-width: 550px;
  }
`;

export function Hero({ content }) {
  const { title, subtitle, CTA, CTALink } = content;

  const internalLink = CTA && CTALink.slice(0, 1) === '/';

  const MotionLink = motion(Link);

  return CTA !== '' ? (
    <HeroContainer>
      {title && <h1 className="title">{title}</h1>}
      {subtitle && <h2 className="subtitle">{subtitle}</h2>}
      {internalLink ? (
        <MotionLink className="callToAction" to={CTALink} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          {CTA}
        </MotionLink>
      ) : (
        <motion.a className="callToAction" href={CTALink} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          {CTA}
        </motion.a>
      )}
    </HeroContainer>
  ) : (
    <HeroContainer>
      {title && <h1 className="title">{title}</h1>}
      {subtitle && <h2 className="subtitle">{subtitle}</h2>}
    </HeroContainer>
  );
}
