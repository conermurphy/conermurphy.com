import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import matchingLanguageIcon, { findMatchingLanguage } from '../utils/findMatchingLanguageIcon';
import NoteDate from './NoteDate';

const NoteContainer = styled.div`
  display: grid;
  grid-template-columns: 200px 700px;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 2.5rem;
  border-bottom: 2px solid var(--grey);

  @media (max-width: 1200px) {
    grid-template-columns: 200px 500px;
  }

  @media (max-width: 400px) {
    grid-template-columns: 90%;
    grid-template-rows: auto 1fr;
    align-items: center;
    justify-content: center;
  }

  .postInfoContainer {
    display: grid;
    grid-template-rows: 1fr 3rem 4rem;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }

  .languageContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: auto;
    gap: 1rem;
    height: 3rem;
  }

  .id {
    font-size: 1.5rem;
    width: max-content;
    font-weight: bold;
    margin: auto;
    background-color: var(--grey);
    padding: 0.5rem 1rem;
    justify-self: center;
  }

  .noteContent {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;

    @media (max-width: 400px) {
      text-align: center;
      align-items: center;
    }

    & > .noteTitle {
      font-size: 2.5rem;
    }

    & > .noteExcerpt {
      font-size: 1.75rem;
    }

    & > button {
      width: 150px;
      font-size: 1.5rem;
      background-color: var(--white);
      border: 1px solid var(--green);
      padding: 0.75rem 1rem;
    }
  }
`;

export default function NotePostCard({ note }) {
  const { frontmatter, fields, excerpt } = note.node;
  const { date, id, title } = frontmatter;
  const { slug, noteCategory } = fields;

  // Find the language tag and icon to display on the note.
  const languageIcon = matchingLanguageIcon(noteCategory, '2rem');
  const languageTag = findMatchingLanguage(noteCategory);

  return (
    <Link to={slug}>
      <NoteContainer>
        <div className="postInfoContainer">
          <NoteDate date={date} />
          <div className="languageContainer">
            {languageIcon}
            <p>{languageTag}</p>
          </div>
          <p className="id">Note: #{id}</p>
        </div>
        <div className="noteContent">
          <h2 className="noteTitle">{title}</h2>
          <p className="noteExcerpt">{excerpt}</p>
          <button type="button">Read More...</button>
        </div>
      </NoteContainer>
    </Link>
  );
}

NotePostCard.propTypes = {
  note: PropTypes.shape({
    node: PropTypes.shape({
      frontmatter: PropTypes.shape({
        date: PropTypes.string,
        id: PropTypes.number,
        title: PropTypes.string,
      }),
      fields: PropTypes.shape({
        slug: PropTypes.string,
        noteCategory: PropTypes.string,
      }),
      excerpt: PropTypes.string,
    }),
  }),
};
