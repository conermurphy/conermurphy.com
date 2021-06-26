import React from 'react';
import styled from 'styled-components';
import { GatsbyImage } from 'gatsby-plugin-image';
import { graphql, Link } from 'gatsby';
import SEO from '../components/SEO';
import { Hero } from '../components/Hero';

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: clamp(300px, 80vw, var(--maxWidth));
  margin-bottom: 5rem;

  & > h1 {
    width: clamp(300px, 60vw, 700px);
    text-align: center;
  }

  .sectionContainer {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
    gap: 5rem;
    margin-bottom: 5rem;

    .gatsby-image-wrapper {
      width: 300px;
      border-radius: var(--borderRadius);
      filter: drop-shadow(var(--shadow));
      object-position: top;
    }

    .textContainer {
      width: clamp(300px, 60vw, 700px);

      & > h2 {
        margin-top: 0;
      }

      & > p > a {
        font-weight: bold;
        text-decoration: none;
      }
    }
  }
`;

export default function AboutMe({ data, path }) {
  const { portraitImage, pcImage, projects } = data;

  const heroContent = {
    title: "Hi 👋, I'm Coner Murphy.",
    subtitle: "Want to find out more about me and my journey? Here's the palce to do it.",
    CTA: 'Want to set up a call?',
    CTALink: '/contact',
  };

  return (
    <>
      <SEO
        post={{
          slug: path,
          title: 'About Me',
        }}
      />
      <ContentContainer>
        <Hero content={heroContent} />
        <div className="sectionContainer">
          <GatsbyImage image={portraitImage.childImageSharp.gatsbyImageData} alt="Portrait of Coner Murphy." />
          <div className="textContainer">
            <p>
              I'm a Freelance Website Developer from the UK. I specialise in building beautiful and easy-to-use websites for businesses and
              individuals.
            </p>
            <p>
              My goal is to help everyone achieve their goals by giving them a great online presence. No matter if you're a business or an
              individual, I want to help you succeed.
            </p>
            <p>
              I have been building websites as a hobbyist since I was in High School. But, in the last few years in particular I've
              developed a deep passion for building websites.
            </p>
            <p>
              I aim to give everyone involved a great experience. From the end-user using the website day-to-day. To the individual or team
              maintaining and uploading new content. A great website doesn't stop at what the user's see, it's much more than that.
            </p>
          </div>
        </div>
        <div className="sectionContainer">
          <div className="textContainer">
            <h2>My Journey</h2>
            <p>
              For as long as I can remember, I've loved technology. From a young age, I've always wanted to know how something works. And as
              I got older, this natural curiosity grew with me.
            </p>
            <p>
              I moved from taking apart toys to tearing down computers and building my own. To this day I describe building computers as
              adult Lego (not everyone believes me on this).
            </p>
            <p>
              5 years ago my interest shifted from playing with hardware to building software. In particular, building great websites and
              web applications. Over time, this interest grew until last year when I got the opportunity to make a website for a friend.
            </p>
            <p>This is when I realised that building websites is what I want to do full time and started to build a business.</p>
          </div>
          <GatsbyImage image={pcImage.childImageSharp.gatsbyImageData} alt="PC Build In Progress." />
        </div>
        <div className="sectionContainer">
          <GatsbyImage image={projects.childImageSharp.gatsbyImageData} alt="Previous Projects" />
          <div className="textContainer">
            <h2>How I can help you.</h2>
            <p>I want to help you and your business achieve your goals by making you a website that your users will adore.</p>
            <p>
              Right now, you might not even be sure if you need a new website. This is the reason I offer a website review service. I will
              review your website from top to bottom and make a comprehensive report on it. This report will show every aspect of your
              website we could improve to help your business grow.
            </p>
            <p>
              You might already want a new website which is great. But, the next question is where do you start? And, what do you need?{' '}
            </p>
            <p>
              This is where I come in, I'm here to help you through the entire process. Between us, we will work out what you need for your
              business and take it from an idea to a finished product.
            </p>
            <p>
              No matter the project, I'm here to help you make it a reality. If you've got any questions or want to get started,{' '}
              <Link to="/contact">let's get a meeting in the diary.</Link>
            </p>
            <p>
              If you're not quite sure if you're ready, you can <Link to="/#services">check out all the services I offer here.</Link>
            </p>
          </div>
        </div>
      </ContentContainer>
    </>
  );
}

export const query = graphql`
  query {
    pcImage: file(name: { eq: "pcBuild" }) {
      childImageSharp {
        gatsbyImageData(height: 500, placeholder: BLURRED)
      }
    }
    portraitImage: file(name: { eq: "portraitImage" }) {
      childImageSharp {
        gatsbyImageData(width: 300, placeholder: BLURRED)
      }
    }
    projects: file(name: { eq: "aboutMeProjects" }) {
      childImageSharp {
        gatsbyImageData(width: 300, placeholder: BLURRED)
      }
    }
  }
`;
