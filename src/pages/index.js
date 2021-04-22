import React from 'react';
import { MdPersonPin, MdLocationOn, MdContacts } from 'react-icons/md';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import { ContentSection, HeroBackground, InfoBlock, LandingSection, WaveDivider } from '../styles/HomeStyles';
import EmailSignupForm from '../components/EmailSignupForm';
import useNavTheme from '../utils/useNavTheme';
import BlogPostCard from '../components/BlogPostCard';
import SEO from '../components/SEO';
import TestimonialCard from '../components/TestimonialCard';
import testimonialData from '../data/testimonials.json';
import PortfolioPostCard from '../components/PortfolioPostCard';
import ContactIcons from '../components/ContactIcons';
import HireMeBlock from '../components/HireMeBlock';

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
      <HeroBackground id="homeBackground">
        {/* SVG Divider Code from https://stackoverflow.com/questions/17202548/wavy-shape-with-css/56012973#56012973 */}
        <WaveDivider>
          <svg viewBox="0 70 500 60" preserveAspectRatio="none">
            <rect x="0" y="0" width="500" height="500" />
            <path d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z" />
          </svg>
        </WaveDivider>
      </HeroBackground>
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
      <EmailSignupForm marginRequired />
      <ContentSection>
        <div className="headerTitleSeperator">
          <h3>Portfolio</h3>
          <Link to="/portfolio">View All</Link>
        </div>
        <div className="content">
          {portfolio.edges.map(({ node: post }) => (
            <PortfolioPostCard key={`portfolioPostCard-${post.id}`} post={post} />
          ))}
        </div>
      </ContentSection>
      <ContentSection>
        <div className="headerTitleSeperator">
          <h3>Blog</h3>
          <Link to="/blog">View All</Link>
        </div>
        <div className="content">
          {blog.edges.map((post) => (
            <BlogPostCard key={`HomeBlogPostCard-${post.node.frontmatter.id}`} post={post} />
          ))}
        </div>
      </ContentSection>
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
