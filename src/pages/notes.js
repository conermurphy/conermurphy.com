import React from 'react';
import styled from 'styled-components';
import { graphql, Link } from 'gatsby';
import useNavTheme from '../utils/useNavTheme';
import NotePostCard from '../components/NotePostCard';

const AllNotesContainer = styled.div`
  display: flex;
  flex-direction: column;

  * {
    text-decoration: none;
  }
`;

export default function Notes({ data }) {
  const { edges: notes } = data.notes;
  // Setting the nav theme for this page
  useNavTheme('dark');

  return (
    <>
      <div className="headerTitleSeperator">
        <h1>Notes</h1>
      </div>
      <AllNotesContainer>
        {notes.map((note) => (
          <NotePostCard key={`NotePostCard-${note.node.frontmatter.id}`} note={note} />
        ))}
      </AllNotesContainer>
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
    }
  }
`;
