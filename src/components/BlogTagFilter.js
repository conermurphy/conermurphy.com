import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';
import findTagInfo from '../utils/findTagInfo';

const BlogPostTagContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 2rem;

  a {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0 1rem;
    align-items: center;
    padding: 5px;
    background-color: var(--grey);
    text-decoration: none;
    padding: 0.5rem 1rem;

    .count {
      background-color: var(--white);
      border-radius: 2px;
      padding: 0 0.5rem;
    }
    &[aria-current='page'] {
      background-color: var(--green);
    }
  }
`;

function countTagsInPosts(tags) {
  const counts = tags
    .map(({ node }) =>
      node.frontmatter.tags.map((tag) => {
        const { matchingTag } = findTagInfo(tag);
        return matchingTag;
      })
    )
    .flat()
    .reduce((acc, tag) => {
      const existingTag = acc[tag];
      if (existingTag) {
        existingTag.count += 1;
      } else {
        acc[tag] = {
          tag,
          count: 1,
        };
      }
      return acc;
    }, {});

  const sortedTags = Object.values(counts).sort((a, b) => b.count - a.count);
  return sortedTags;
}

export default function BlogTagFilter({ activeTag }) {
  // query for all of the tags
  const {
    tags: { edges: tags },
  } = useStaticQuery(graphql`
    query {
      tags: allMdx(filter: { fields: { contentCategory: { eq: "blog" } } }) {
        edges {
          node {
            frontmatter {
              tags
            }
          }
        }
      }
    }
  `);

  // count the total amount of tags for every post
  const tagsWithCounts = countTagsInPosts(tags);

  return (
    <BlogPostTagContainer>
      <Link to="/blog">
        <span className="tag">All</span>
        <span className="count">{tags.length}</span>
      </Link>
      {tagsWithCounts.map(({ tag, count }) => (
        <Link
          to={`/blog/${tag.toLowerCase()}/1`}
          key={`BlogPostTagFilter-${tag}-${tag.count}`}
          className={tag === activeTag ? 'active' : ''}
        >
          <span className="tag">{tag}</span>
          <span className="count">{count}</span>
        </Link>
      ))}
    </BlogPostTagContainer>
  );
}
