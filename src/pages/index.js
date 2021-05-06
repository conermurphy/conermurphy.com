import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/SEO';
import { ServiceSection } from '../components/Services';
import { Testimonials } from '../components/Testimonials';
import { Hero } from '../components/Hero';
import { CallToAction } from '../components/CallToAction';

export default function HomePage({ path }) {
  const heroContent = {
    title: 'Hi, I’m Coner.',
    subtitle: 'I Help Businesses Grow by Developing Astounding Websites.',
    CTA: 'Ready To Grow?',
    CTALink: '/contact-me',
  };

  return (
    <>
      <SEO
        post={{
          slug: path,
          title: 'Home',
        }}
      />
      <Hero content={heroContent} />
      <ServiceSection />
      <CallToAction />
      <Testimonials />
    </>
  );
}
