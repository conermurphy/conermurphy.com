import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import useNavTheme from '../utils/useNavTheme';
import NotePostCard from '../components/NotePostCard';
import Pagination from '../components/Pagination';

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

export default function Notes({ data, pageContext }) {
  const { edges: notes, totalCount } = data.notes;
  const { currentPage, skip } = pageContext;
  // Setting the nav theme for this page
  useNavTheme('dark');

  return (
    <>
      <div className="headerTitleSeperator">
        <h1>Notes</h1>
      </div>
      <Pagination
        pageSize={parseInt(process.env.GATSBY_NOTES_PAGE_SIZE)}
        totalCount={totalCount}
        currentPage={currentPage || 1}
        skip={skip}
        base="notes"
      />
      <AllNotesContainer>
        {notes.map((note) => (
          <NotePostCard key={`NotePostCard-${note.node.frontmatter.id}`} note={note} />
        ))}
      </AllNotesContainer>
      <Pagination
        pageSize={parseInt(process.env.GATSBY_NOTES_PAGE_SIZE)}
        totalCount={totalCount}
        currentPage={currentPage || 1}
        skip={skip}
        base="notes"
      />
    </>
  );
}

export const query = graphql`
  query($skip: Int = 0, $pageSize: Int = 4) {
    notes: allMdx(
      limit: $pageSize
      skip: $skip
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
      totalCount
    }
  }
`;
