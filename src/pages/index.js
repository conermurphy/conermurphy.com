import React from 'react';
import { MdPersonPin, MdLocationOn, MdLanguage, MdContacts } from 'react-icons/md';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import { ContentSection, HeroBackground, InfoBlock, LandingSection, NotesContentSection } from '../styles/HomeStyles';
import EmailSignupForm from '../components/emailSignupForm';
import useNavTheme from '../utils/useNavTheme';
import BlogPostCard from '../components/BlogPostCard';
import NotePostCard from '../components/NotePostCard';
import SEO from '../components/SEO';
import LanguageIcons, { languageList } from '../templates/LanguageIcons';
import TestimonialCard from '../components/TestimonialCard';
import testimonialData from '../data/testimonials.json';
import PortfolioPostCard from '../components/PortfolioPostCard';
import ContactIcons from '../components/ContactIcons';

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
      <HeroBackground id="homeBackground" />
      <LandingSection>
        <div className="contactBlock">
          <h1>
            Hey, <span>I'm Coner.</span>
          </h1>
          <div>
            <p>
              I'm a Web Developer and on a journey to be the best developer I can and along the way I want to help others grow by sharing my
              lessons.
            </p>
            <p>If this sounds cool to you, then please stick around and consider signing up to my newsletter below! </p>
          </div>
        </div>
        <InfoBlock id="aboutMe">
          <div className="aboutMe">
            <h2>About Me</h2>
          </div>
          <ul>
            <li>
              Coner Murphy <MdPersonPin />
            </li>
            <li>
              Norwich, United Kingdom <MdLocationOn />
            </li>
            <li className="languagesContainer">
              <ul className="languages">
                {languageList.map((lan) => (
                  <li key={`HomePageLanguages-${lan}`}>
                    <LanguageIcons language={lan} width="2rem" />
                  </li>
                ))}
              </ul>
              <MdLanguage />
            </li>
            <li>
              <ContactIcons />
              <MdContacts />
            </li>
          </ul>
        </InfoBlock>
      </LandingSection>
      <EmailSignupForm marginRequired />
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
    </>
  );
}

export const query = graphql`
  query HomePageContentQuery {
    blog: allMdx(sort: { order: DESC, fields: frontmatter___date }, filter: { fields: { contentCategory: { eq: "blog" } } }, limit: 3) {
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
                fluid(maxWidth: 400) {
                  ...GatsbyImageSharpFluid
                }
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
    blog: PropTypes.array,
    notes: PropTypes.array,
    portfolio: PropTypes.array,
  }),
  path: PropTypes.string,
};
