import React from 'react';
import styled from 'styled-components';
import { FaGithub } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Container = styled.aside`
  display: grid;
  align-items: center;
  justify-content: center;
  max-width: 600px;
  margin: auto;
  margin-top: 5rem;
  padding: 2rem 5rem;
  border-left: 2px solid var(--green);
  background-color: var(--white);
  filter: drop-shadow(var(--shadow));

  @media (max-width: 600px) {
    max-width: 230px;
  }

  .editOnGHub {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    height: 3rem;
    border-bottom: 1px solid var(--green);
    width: max-content;
  }

  & > svg {
    color: var(--black);
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
          <p>
            If you think you've found an error in something I've said or shown then I would greatly appreciate it if you could open a pull
            request for the changes on my GitHub Repo.
          </p>
          <p>
            All changes no matter how large or small are appreciated, I just want to help as many people as possible with the most accurate
            information possible.
          </p>
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
