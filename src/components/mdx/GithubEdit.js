import React from 'react';
import styled from 'styled-components';
import { FaGithub } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Container = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  max-width: 600px;
  margin: auto;
  margin-top: 5rem;
  padding: 2rem 5rem;
  border-top: 3px solid var(--accent);
  background-color: var(--secondaryBg);
  filter: drop-shadow(var(--shadow));

  .editOnGHub {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    height: 3rem;
    border-bottom: 1px solid var(--accent);
    width: max-content;
    font-weight: bold;
  }

  & > svg {
    height: 5rem;
    width: 5rem;
    padding: 1rem;
  }
`;

export default function GithubEdit({ postURL }) {
  const base = 'https://github.com/conermurphy/conermurphy.com/tree/master/src/';

  const githubLink = `${base}${postURL.split('/src/')[1]}`;

  return (
    <a href={githubLink} aria-label="Github" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
      <Container>
        <div>
          <p>Found an issue with this post? Think you could add, clarify or improve it?</p>
          <p>All my posts are available on GitHub. All fixes are greatly appreciated!</p>
          <div className="editOnGHub">
            <FaGithub />
            <p>Edit on Github...</p>
          </div>
        </div>
      </Container>
    </a>
  );
}

GithubEdit.propTypes = {
  postURL: PropTypes.string,
};
