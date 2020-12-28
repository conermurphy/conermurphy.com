import { MDXProvider } from '@mdx-js/react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';
import styled from 'styled-components';
import ClosingComponents from '../components/mdx/ClosingComponents';
import Components from '../components/mdx/Components';
import NoteDate from '../components/NoteDate';
import SEO from '../components/SEO';
import Tags from '../components/Tags';
import matchingLanguageIcon, { findMatchingLanguage } from '../utils/findMatchingLanguageIcon';

const NoteContainer = styled.article`
  display: flex;
  flex-direction: column;
  margin: auto;
  padding-bottom: 0;
  max-width: 700px;
`;

const NoteHeader = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  align-items: center;
  justify-content: center;

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
  const { frontmatter, timeToRead, body, fields } = notes;
  const { filePath, contentCategory, noteCategory, slug } = fields;
  const { title, description, date, tags, id, plainDate } = frontmatter;

  const languageIcon = matchingLanguageIcon(noteCategory, '2rem');
  const languageTag = findMatchingLanguage(noteCategory);

  return (
    <>
      <SEO
        post={{
          slug: path,
          title,
          description,
          image: languageIcon,
          article: true,
          date: plainDate,
        }}
      />
      <NoteContainer>
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
            <Tags frontmatter={frontmatter} />
          </div>
        </NoteHeader>
        <div>
          <MDXProvider components={Components}>
            <MDXRenderer>{body}</MDXRenderer>
          </MDXProvider>
          <ClosingComponents
            githubLinkInfo={{
              filePath,
              contentCategory,
              noteCategory,
            }}
            pageContext={pageContext}
          />
        </div>
      </NoteContainer>
    </>
  );
}

export const query = graphql`
  query($slug: String!) {
    notes: mdx(fields: { slug: { eq: $slug } }) {
      body
      timeToRead
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
      }
    }
  }
`;
