import React from 'react';
import { MdPersonPin, MdLocationOn, MdLanguage, MdContacts } from 'react-icons/md';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import { ContentSection, HeroBackground, InfoBlock, LandingSection, NotesContentSection, WaveDivider } from '../styles/HomeStyles';
import EmailSignupForm from '../components/EmailSignupForm';
import useNavTheme from '../utils/useNavTheme';
import BlogPostCard from '../components/BlogPostCard';
import NotePostCard from '../components/NotePostCard';
import SEO from '../components/SEO';
import LanguageIcons, { languageList } from '../templates/LanguageIcons';
import TestimonialCard from '../components/TestimonialCard';
import testimonialData from '../data/testimonials.json';
import PortfolioPostCard from '../components/PortfolioPostCard';
import ContactIcons from '../components/ContactIcons';
import HireMeBlock from '../components/HireMeBlock';

export default function HomePage({ data, path }) {
  const { blog, notes, portfolio } = data;

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
            <li className="languagesContainer">
              <ul className="languages">
                {languageList.map((lan) => (
                  <li key={`HomePageLanguages-${lan}`}>
                    <LanguageIcons language={lan} width="2rem" />
                  </li>
                ))}
              </ul>
              <MdLanguage className="categoryIcon" />
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
    </>
  );
}

export const query = graphql`
  query HomePageContentQuery {
    blog: allMdx(
      sort: { order: [DESC, DESC], fields: [frontmatter___date, frontmatter___id] }
      filter: { fields: { contentCategory: { eq: "blog" } } }
      limit: 3
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD/MM/YYYY")
            tags
            title
            id
            image {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH)
              }
            }
          }
        }
      }
    }
    notes: allMdx(
      limit: 3
      sort: { order: [DESC, DESC], fields: [frontmatter___date, frontmatter___id] }
      filter: { fields: { contentCategory: { eq: "notes" } } }
    ) {
      edges {
        node {
          fields {
            slug
            noteCategory
          }
          frontmatter {
            date(formatString: "DDMMYYYY")
            tags
            title
            id
          }
          excerpt(pruneLength: 250)
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
    notes: PropTypes.object,
    portfolio: PropTypes.object,
  }),
  path: PropTypes.string,
};
