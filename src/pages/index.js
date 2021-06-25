import React from 'react';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { ServiceSection } from '../components/Services';
import { Testimonials } from '../components/Testimonials';
import { CallToAction } from '../components/CallToAction';

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 5rem 0;
  gap: 2.5rem;
  text-align: center;
  height: clamp(600px, 100vh, 700px);

  & > h2 {
    font-size: 2.5rem;
    margin-top: 0;
    width: clamp(300px, 50vw, 700px);
  }

  & > .gatsby-image-wrapper {
    width: 150px;
    height: 150px;
    filter: drop-shadow(var(--shadow));
  }

  & > .linkContainer {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 3rem;

    & > .outlinedLink {
      background-color: var(--secondaryBg);
      color: var(--primaryText);
    }
  }
`;

export default function HomePage({ path }) {
  const MotionLink = motion(Link);

  return (
    <>
      <SEO
        post={{
          slug: path,
          title: 'Home',
        }}
      />
      <HeroSection>
        <h1 className="title">Hi, I’m Coner.</h1>
        <h2 className="subtitle">I want to help your business grow by giving you an outstanding website your customers will adore.</h2>
        <div className="linkContainer">
          <MotionLink to="/about-me" className="callToAction outlinedLink" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Learn More About Me.
          </MotionLink>
          <MotionLink to="/contact" className="callToAction" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Let's Get To Work.
          </MotionLink>
        </div>
      </HeroSection>
      <ServiceSection />
      <CallToAction />
      <Testimonials />
    </>
  );
}
