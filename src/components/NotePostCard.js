import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import matchingLanguageIcon, { findMatchingLanguage } from '../utils/findMatchingLanguageIcon';

const NoteContainer = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  align-items: center;
  gap: 2rem;
  padding: 2.5rem;
  border-bottom: 2px solid var(--grey);

  .postInfoContainer {
    justify-self: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  .dateContainer {
    display: grid;
    grid-template-rows: repeat(auto-fit, min-content);
    justify-items: center;
    align-items: center;
    position: relative;
    width: 5rem;
    padding: 0;

    ::after,
    ::before {
      display: block;
      position: absolute;
      width: 2.5rem;
      height: 2.5rem;
      content: '';
    }

    ::after {
      top: -10px;
      right: -10px;
      border-top: 2px solid var(--black);
      border-right: 2px solid var(--black);
    }

    ::before {
      bottom: -10px;
      left: -10px;
      border-bottom: 2px solid var(--black);
      border-left: 2px solid var(--black);
    }

    & > span {
      font-size: 2.5rem;
    }
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
    height: 100%;
    font-weight: bold;
    margin-top: 1rem;
    background-color: var(--grey);
    padding: 0.5rem 1rem;
  }

  .noteContent {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;

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
          <p className="dateContainer">
            <span>{date.slice(0, 4)}</span>
            <span>{date.slice(4, 8)}</span>
          </p>
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
