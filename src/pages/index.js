import React from 'react';
import styled from 'styled-components';

const LandingPageSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
`;

export default function HomePage() {
  return (
    <>
      <LandingPageSection>
        <h1>Landing Page</h1>
      </LandingPageSection>
      <section>
        <h2>Further Info</h2>
      </section>
    </>
  );
}
