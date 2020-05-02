import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CornerArt from './cornerArt';

const CardLink = styled(Link)`
  margin: 1rem;
`;

const CardContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
  padding-top: 1.5rem;
  width: 60vw;
  height: auto;
  max-width: 20rem;
  border-radius: 2vh;
  overflow: hidden;
  background-color: var(--secondary-color);

  box-shadow: 0px 2px 2px rgba(200, 200, 200, 20);
  box-shadow: 0px 4px 4px rgba(200, 200, 200, 20);
  box-shadow: 0px 6px 6px rgba(200, 200, 200, 20);
`;

const PostInfo = styled.p`
  font-size: 0.9rem;
`;

const PostTitle = styled.h3`
  margin: 0.5rem;
  font-size: 1.4rem;
`;

const AuthorName = styled.p`
  position: absolute;
  bottom: 0;
  left: 0;
  padding-left: 1rem;
  font-size: 0.75rem;
`;

const BlogPostCard = ({ post }) => (
  <CardLink to={post.fields.slug}>
    <CardContainer>
      <PostInfo>{post.frontmatter.category}</PostInfo>
      <PostTitle>{post.frontmatter.title}</PostTitle>
      <PostInfo>{`Post ${post.fields.postId} - ${post.frontmatter.date}`}</PostInfo>
      <AuthorName>@MrConerMurphy</AuthorName>
      <CornerArt adjustments={[1.5, 0, 0, 0]} />
    </CardContainer>
  </CardLink>
);

BlogPostCard.propTypes = {
  post: PropTypes.shape({
    frontmatter: PropTypes.shape({
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      languages: PropTypes.array.isRequired,
    }),
    fields: PropTypes.shape({
      slug: PropTypes.string.isRequired,
      postId: PropTypes.number.isRequired,
    }),
  }),
};

export default BlogPostCard;