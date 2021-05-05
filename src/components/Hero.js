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

  & > h2 {
    font-size: 2.5rem;
    margin-top: 0;
  }

  & > .callToAction {
    padding: 1.5rem 5rem;
  }
`;

export function Hero({ content }) {
  const { title, subtitle, CTA, CTALink } = content;

  const internalLink = CTA && CTALink.slice(0, 1) === '/';

  return (
    <HeroContainer>
      {title && <h1 className="title">{title}</h1>}
      {subtitle && <h2 className="subtitle">{subtitle}</h2>}
      {CTA && internalLink ? (
        <Link className="callToAction" to={CTALink}>
          {CTA}
        </Link>
      ) : (
        <a className="callToAction" href={CTALink}>
          {CTA}
        </a>
      )}
    </HeroContainer>
  );
}
