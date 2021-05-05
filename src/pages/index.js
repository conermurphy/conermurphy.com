import React from 'react';
import { graphql, Link } from 'gatsby';
import { LandingSection } from '../styles/HomeStyles';
import useNavTheme from '../utils/useNavTheme';
import SEO from '../components/SEO';
import { ServiceSection } from '../components/Services';
import { Testimonials } from '../components/Testimonials';

export default function HomePage({ path }) {
  // Setting the nav theme for this page
  useNavTheme('light');

  return (
    <>
      <SEO
        post={{
          slug: path,
          title: 'Home',
        }}
      />
      <LandingSection>
        <div className="contactBlock">
          <h1>
            Hey, <span>I'm Coner.</span>
          </h1>
          <div>
            <p>
              A Freelance Web Developer from the UK 🇬🇧, when I'm not developing I write content for my{' '}
              <Link to="/blog" style={{ color: 'var(--white)' }}>
                blog
              </Link>{' '}
              and{' '}
              <a href="https://twitter.com/MrConerMurphy" style={{ color: 'var(--white)' }}>
                Twitter.
              </a>
            </p>
            <p>My other passions include: Gaming 🎮, Reading 📚, Motorbikes 🏍️, Coffee ☕ and Music 🎧. </p>
            <p>If this sounds cool, please stick around and consider signing up to my newsletter. </p>
          </div>
          <div />
        </div>
      </LandingSection>
      <ServiceSection />
      <Testimonials />
    </>
  );
}

export const query = graphql`
  query HomePageContentQuery {
    blog: allMdx(sort: { order: [DESC], fields: [frontmatter___date] }, filter: { fields: { contentCategory: { eq: "blog" } } }, limit: 3) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD/MM/YYYY")
            tags
            title
            image {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH)
              }
            }
          }
        }
      }
    }
    portfolio: allPortfolio(limit: 3, sort: { order: DESC, fields: date }) {
      edges {
        node {
          tags
          repo
          id
          description
          date(formatString: "DD/MM/YYYY")
          URL
          type
          title
          image
        }
      }
    }
  }
`;
