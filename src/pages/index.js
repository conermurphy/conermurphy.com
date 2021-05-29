import React from 'react';
import { graphql, Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
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

  & > h2 {
    font-size: 2.5rem;
    margin-top: 0;
    width: clamp(300px, 50vw, 700px);
  }

  & > .gatsby-image-wrapper {
    width: 150px;
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

export default function HomePage({ path, data }) {
  const { logo } = data;

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
        <GatsbyImage image={logo.childImageSharp.gatsbyImageData} alt="Logo" />
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
<<<<<<< HEAD
      </ContentSection>
      <ContentSection>
        <div className="headerTitleSeperator">
          <h3>Blog</h3>
          <Link to="/blog">View All</Link>
        </div>
        <div className="content">
          {blog.edges.map((post) => (
            <BlogPostCard key={`HomeBlogPostCard-${post.node.frontmatter.title}`} post={post} />
          ))}
        </div>
      </ContentSection>
      <NotesContentSection>
        <div className="headerTitleSeperator">
          <h3>Notes</h3>
          <Link to="/notes">View All</Link>
        </div>
        <div className="content">
          {notes.edges.map((note) => (
            <NotePostCard
              key={`HomeNotePostCard-${note.node.fields.noteCategory}-${note.node.frontmatter.title}-${note.node.frontmatter.id}`}
              note={note}
            />
          ))}
        </div>
      </NotesContentSection>
      <ContentSection>
        <div className="headerTitleSeperator">
          <h3>Testimonials</h3>
        </div>
        <div className="content testimonial">
          {testimonialData.map((testimonial, index) =>
            index <= 3 ? <TestimonialCard key={`HomePage-Testimony-${index}-${testimonial.company}`} testimonial={testimonial} /> : ''
          )}
        </div>
      </ContentSection>
=======
      </HeroSection>
      <ServiceSection />
      <CallToAction />
      <Testimonials />
>>>>>>> redesign-v4
    </>
  );
}

export const query = graphql`
  query {
    logo: file(name: { eq: "Logo" }) {
      childImageSharp {
        gatsbyImageData(width: 150, placeholder: BLURRED)
      }
    }
  }
`;
