import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import useNavTheme from '../utils/useNavTheme';
import NotePostCard from '../components/NotePostCard';
import Pagination from '../components/Pagination';
import SEO from '../components/SEO';
import TagFilter from '../components/TagFilter';

const AllNotesContainer = styled.div`
  display: flex;
  flex-direction: column;

  & > a :last-child {
    > div:last-child {
      border-bottom: none;
    }
  }

  * {
    text-decoration: none;
  }
`;

export default function Notes({ data, pageContext, path }) {
  const { edges: notes, totalCount } = data.notes;
  const { currentPage, skip, tag } = pageContext;

  // Setting the nav theme for this page
  useNavTheme('dark');

  let pageTitle;

  if (tag) {
    pageTitle = `${tag} Notes ${currentPage ? `- Page ${currentPage}` : ''}`;
  } else {
    pageTitle = `Notes ${currentPage ? `- Page ${currentPage}` : ''}`;
  }

  return (
    <>
      <SEO
        post={{
          slug: path,
          title: pageTitle,
        }}
      />
      <div className="headerTitleSeperator">
        <h1>Notes</h1>
      </div>
      <TagFilter base="notes" activeTag={tag} />
      <Pagination
        pageSize={parseInt(process.env.GATSBY_NOTES_PAGE_SIZE)}
        totalCount={totalCount}
        currentPage={currentPage || 1}
        skip={skip}
        base={path}
      />
      <AllNotesContainer>
        {notes.map((note) => (
          <NotePostCard
            key={`NotePostCard-${note.node.fields.noteCategory}-${note.node.frontmatter.title}-${note.node.frontmatter.id}`}
            note={note}
          />
        ))}
      </AllNotesContainer>
      <Pagination
        pageSize={parseInt(process.env.GATSBY_NOTES_PAGE_SIZE)}
        totalCount={totalCount}
        currentPage={currentPage || 1}
        skip={skip}
        base={path}
      />
    </>
  );
}

export const query = graphql`
  query($skip: Int = 0, $pageSize: Int = 6, $tagRegex: String) {
    notes: allMdx(
      limit: $pageSize
      skip: $skip
      sort: { order: [DESC, DESC], fields: [frontmatter___date, frontmatter___id] }
      filter: { fields: { contentCategory: { eq: "notes" }, noteCategory: { regex: $tagRegex } } }
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
      totalCount
    }
  }
`;
