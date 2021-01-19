import { MDXProvider } from '@mdx-js/react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ClosingComponents from '../components/mdx/ClosingComponents';
import Components from '../components/mdx/Components';
import NoteDate from '../components/NoteDate';
import SEO from '../components/SEO';
import Tags from '../components/Tags';
import matchingLanguageIcon, { findMatchingLanguage } from '../utils/findMatchingLanguageIcon';
import useNavTheme from '../utils/useNavTheme';
import { PostBodyContainer, PostContainer } from '../styles/BlogNoteStyles';

const NoteHeader = styled.div`
  display: grid;
  grid-template-columns: 0.25fr 1fr;
  align-items: center;
  justify-content: center;
  padding-bottom: 2rem;
  border-bottom: 2px solid var(--grey);

  @media (max-width: 600px) {
    grid-template-columns: 100%;
    text-align: center;
    align-items: center;
    justify-items: center;

    & > div {
      margin-top: 2rem;
    }
  }

  .langIDContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }

  .languageContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    height: 3rem;
  }

  .id {
    font-size: 1.5rem;
    font-weight: bold;
    background-color: var(--grey);
    padding: 0.5rem 1rem;
    justify-self: center;
  }

  .noteTitle {
    font-size: 2.5rem;
  }
`;

export default function NotesPost({ data, pageContext, path }) {
  // Destructing out values to use in page.
  const { notes } = data;
  const { frontmatter, timeToRead, body, fields, fileAbsolutePath, excerpt } = notes;
  const { noteCategory } = fields;
  const { title, date, tags, id, plainDate, image } = frontmatter;

  const languageIcon = matchingLanguageIcon(noteCategory, '2rem');
  const languageTag = findMatchingLanguage(noteCategory);

  // Setting image path for SEO if no image use the logo.
  const imagePath = image ? image.childImageSharp.fluid.src : '/Logo.svg';

  // Updating the nav to show dark theme.
  useNavTheme('dark');

  return (
    <>
      <SEO
        post={{
          slug: path,
          title,
          description: excerpt,
          image: imagePath,
          article: true,
          date: plainDate,
        }}
      />
      <PostContainer>
        <NoteHeader>
          <NoteDate date={date} />
          <div>
            <h1 className="noteTitle">{title}</h1>
            <div className="langIDContainer">
              <p className="id">Note: #{id}</p>
              <div className="languageContainer">
                {languageIcon}
                <p>{languageTag}</p>
              </div>
              <p>| {timeToRead === 1 ? `${timeToRead} Minute` : `${timeToRead} Minutes`}</p>
            </div>
            <Tags tags={tags} />
          </div>
        </NoteHeader>
        <PostBodyContainer>
          <MDXProvider components={Components}>
            <MDXRenderer>{body}</MDXRenderer>
          </MDXProvider>
          <ClosingComponents fileAbsolutePath={fileAbsolutePath} pageContext={pageContext} />
        </PostBodyContainer>
      </PostContainer>
    </>
  );
}

export const query = graphql`
  query($slug: String!) {
    notes: mdx(fields: { slug: { eq: $slug } }) {
      body
      timeToRead
      fileAbsolutePath
      excerpt
      fields {
        filePath
        contentCategory
        noteCategory
        slug
      }
      frontmatter {
        title
        description
        date(formatString: "DDMMYYYY")
        plainDate: date
        series
        tags
        id
        image {
          childImageSharp {
            fluid(maxWidth: 1920, quality: 100, pngQuality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

NotesPost.propTypes = {
  data: PropTypes.shape({
    notes: PropTypes.shape({
      timeToRead: PropTypes.number,
      body: PropTypes.string.isRequired,
      fileAbsolutePath: PropTypes.string,
      excerpt: PropTypes.string,
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        description: PropTypes.string,
        tags: PropTypes.array.isRequired,
        image: PropTypes.object,
        plainDate: PropTypes.string,
      }),
      fields: PropTypes.shape({
        noteCategory: PropTypes.string,
      }),
    }),
  }),
  path: PropTypes.string.isRequired,
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    prev: PropTypes.shape({
      fields: PropTypes.shape({
        slug: PropTypes.string,
      }),
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        series: PropTypes.string,
      }),
    }),
    next: PropTypes.shape({
      fields: PropTypes.shape({
        slug: PropTypes.string.isRequired,
      }),
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        series: PropTypes.string,
      }),
    }),
  }).isRequired,
};
