import { graphql, Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import tagData from '../data/tags.json';

const AllPostsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
  padding: 5rem;

  * {
    text-decoration: none;
  }
`;

const PostContainerBody = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.22);

  .gatsby-image-wrapper {
    width: 100%;
    overflow: visible;
  }

  .contentContainer {
    display: grid;
    grid-template-rows: auto 1fr;
    flex: 1;
    padding: 2rem;
    padding-bottom: 1rem;

    .content {
      h3 {
        font-size: 1.75rem;
        padding: 1rem 0;
      }

      p {
        font-size: 1.5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-top: 0;
      }
    }

    .tags {
      display: flex;
      flex-direction: row;
      gap: 1rem;
    }
  }

  .postIdDate {
    display: flex;
    flex-direction: row;
    padding: 0 1rem;
    background-color: var(--grey);

    p {
      padding: 0.5rem;
      font-size: 1.5rem;
    }

    .id {
      background-color: var(--white);
      border-radius: var(--borderRadius);
      padding: 0.5rem 1rem;
      margin-left: 1rem;
      margin-right: 1rem;
    }
  }
`;

const TagStyle = styled.p`
  margin: 0;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  background-color: ${(props) => props.backgroundColor || ''};
  color: ${(props) => props.color || 'var(--black)'};
  border-radius: var(--borderRadius);
`;

const PageIngo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 2rem;
  padding-bottom: 2rem;
  position: relative;

  ::after,
  ::before {
    border-bottom: 2px solid var(--grey);
    width: 100%;
    content: '';
    position: absolute;
    bottom: 0;
  }

  h1 {
    font-size: 2.5rem;
    text-transform: uppercase;
    font-family: var(--body-font);
    position: relative;

    ::before {
      border-bottom: 2px solid var(--green);
      width: 100%;
      content: '';
      position: absolute;
      bottom: -2rem;
      z-index: 2;
    }
  }
`;

const PostCard = ({ post }) => {
  const { date, description, id, image, slug, tags, title } = post.node.frontmatter;
  return (
    <Link to={slug}>
      <PostContainerBody>
        <Img fluid={image.childImageSharp.fluid} />
        <div className="contentContainer">
          <div className="tags">
            {tags.map((tag) => {
              const tagInfo = tagData[tag];
              const { backgroundColor, color } = tagInfo;
              return (
                <TagStyle backgroundColor={backgroundColor} color={color}>
                  {tag}
                </TagStyle>
              );
            })}
          </div>
          <div className="content">
            <h3>{title}</h3>
            {/* <p>{description}</p> */}
          </div>
        </div>
        <div className="postIdDate">
          <p className="id">#{id}</p>
          <p>{date}</p>
        </div>
      </PostContainerBody>
    </Link>
  );
};

export default function Blog({ data }) {
  const { edges } = data.posts;
  return (
    <>
      <PageIngo>
        <h1>Blog Posts</h1>
      </PageIngo>
      <AllPostsContainer>
        {edges.map((post) => (
          <PostCard post={post} />
        ))}
      </AllPostsContainer>
    </>
  );
}

export const query = graphql`
  query MyQuery {
    posts: allMdx(sort: { fields: frontmatter___id, order: DESC }) {
      edges {
        node {
          frontmatter {
            date
            slug
            tags
            title
            description
            id
            image {
              childImageSharp {
                fluid(maxWidth: 400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
