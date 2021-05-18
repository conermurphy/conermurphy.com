import React from 'react';
import styled from 'styled-components';
import { Hero } from '../components/Hero';
import { Testimonials } from '../components/Testimonials';

export default function ContactMe() {
  const heroContent = {
    title: 'Contact Me',
    subtitle:
      'Ready to start your next project? Want to talk ideas? Or, just want to chat? Send me an email and let’s get a meeting setup.',
    CTA: 'Send me an email.',
    CTALink: 'mailto:hey@conermurphy.com',
  };

  return (
    <>
      <Hero content={heroContent} />
      <Testimonials />
    </>
  );
}
