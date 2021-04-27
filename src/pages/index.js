import React from 'react';
import { MdPersonPin, MdLocationOn, MdContacts } from 'react-icons/md';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import { HeroBackground, InfoBlock, LandingSection } from '../styles/HomeStyles';
import useNavTheme from '../utils/useNavTheme';
import SEO from '../components/SEO';
import ContactIcons from '../components/ContactIcons';
import HireMeBlock from '../components/HireMeBlock';
import { ServiceSection } from '../components/Services';

export default function HomePage({ data, path }) {
  const { blog, portfolio } = data;

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
            <HireMeBlock available layout="row" />
          </div>
          <div />
        </div>
        <InfoBlock id="aboutMe">
          <div className="aboutMe">
            <h2>About Me</h2>
          </div>
          <ul>
            <li>
              Coner Murphy <MdPersonPin className="categoryIcon" />
            </li>
            <li>
              Norwich, United Kingdom <MdLocationOn className="categoryIcon" />
            </li>
            <li>
              <ContactIcons />
              <MdContacts className="categoryIcon" />
            </li>
          </ul>
        </InfoBlock>
      </LandingSection>
      <ServiceSection />
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

HomePage.propTypes = {
  data: PropTypes.shape({
    blog: PropTypes.object,
    portfolio: PropTypes.object,
  }),
  path: PropTypes.string,
};
