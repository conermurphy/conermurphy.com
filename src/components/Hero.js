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

  return CTA !== '' ? (
    <HeroContainer>
      {title && <h1 className="title">{title}</h1>}
      {subtitle && <h2 className="subtitle">{subtitle}</h2>}
      {internalLink ? (
        <Link className="callToAction" to={CTALink}>
          {CTA}
        </Link>
      ) : (
        <a className="callToAction" href={CTALink}>
          {CTA}
        </a>
      )}
    </HeroContainer>
  ) : (
    <HeroContainer>
      {title && <h1 className="title">{title}</h1>}
      {subtitle && <h2 className="subtitle">{subtitle}</h2>}
    </HeroContainer>
  );
}
