import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import CornerArt from './cornerArt';
import TagGenerator from './tagGenerator';

const CardLink = styled(Link)`
  margin: 1rem;
`;

const CardContainer = styled(motion.div)`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem 0;
  padding-top: 1.5rem;
  width: 80vw;
  height: auto;
  min-height: 12rem;
  max-width: 22rem;
  border-radius: 2vh;
  overflow: hidden;
  background-color: var(--secondary-color);
  z-index: 1;
  box-shadow: 0px 0px 10px var(--drop-shadows);
`;

const PostInfo = styled.div`
  font-size: 0.9rem;
  margin: 0.5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const PostTitle = styled.h3`
  margin: 0.5rem;
  font-size: 1.4rem;
  width: -webkit-fill-available;
  width: -moz-available;
`;

const AuthorName = styled.p`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
`;

const cardContainerVariants = {
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
  hidden: {
    opacity: 0,
    y: 0,
    scale: 0,
  },
};

const BlogContentCard = ({ data }) => {
  const { link, topLine, title, bottomLine } = data;

  return (
    <CardLink to={`${link}`}>
      <CardContainer
        whileHover={{ y: -10, scale: 0.95 }}
        layoutTransition={{ ease: 'easeInOut', type: 'spring', damping: 100, stiffness: 500 }}
        initial="hidden"
        animate="visible"
        variants={cardContainerVariants}
      >
        <PostInfo>
          {topLine.map((line, index) => (
            <TagGenerator language={line} key={index} />
          ))}
        </PostInfo>
        <PostTitle>{title}</PostTitle>
        <PostInfo>{bottomLine}</PostInfo>
        <AuthorName>@MrConerMurphy</AuthorName>
        <CornerArt adjustments={['17.5vh', 0, 0, 0]} />
      </CardContainer>
    </CardLink>
  );
};

BlogContentCard.propTypes = {
  data: PropTypes.shape({
    link: PropTypes.string,
    topLine: PropTypes.array,
    title: PropTypes.string,
    bottomLine: PropTypes.string,
  }).isRequired,
};

export default BlogContentCard;
