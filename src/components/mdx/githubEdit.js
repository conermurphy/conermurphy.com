import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Container = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: left;
  background-color: var(--secondary-color);
  margin: 2rem 0 0 0;
  filter: drop-shadow(0 0 2px var(--drop-shadows));
  padding: 3rem;
`;

const ContactMethod = styled(motion.a)`
  & > svg {
    color: var(--grey);
    height: 5rem;
    width: 5rem;
    padding: 1rem;
    margin-right: 0;
  }
`;

const navItemHover = {
  scale: 1.1,
  ease: 'easeInOut',
};

const navItemTap = {
  scale: 0.9,
  ease: 'easeInOut',
};

const GithubEdit = ({ filePath }) => (
  <Container>
    <ContactMethod
      href={`https://github.com/conermurphy/conermurphy.com/tree/master/src/posts/${filePath}/${filePath}.mdx`}
      aria-label="Github"
      whileHover={navItemHover}
      whileTap={navItemTap}
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaGithub />
    </ContactMethod>
    <div>
      <p>
        If you think you've found an error in something I've said or shown then I would greatly appreciate it if you could open a pull
        request for the changes on my GitHub Repo.
      </p>
      <p>
        All changes no matter how large or small are appreciated, I just want to help as many people as possible with the most accurate
        information possible.
      </p>
    </div>
  </Container>
);

GithubEdit.propTypes = {
  filePath: PropTypes.string.isRequired,
};

export default GithubEdit;
