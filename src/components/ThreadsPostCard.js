import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { GatsbyImage } from 'gatsby-plugin-image';
import { number } from 'prop-types';

const ThreadContainer = styled.div`
  max-width: 400px;

  .gatsby-image-wrapper {
    width: 400px;
    border-radius: var(--borderRadius);
  }

  .published {
    font-size: 1.3rem;
    margin: 0.5rem 0;
    font-weight: 300;
    opacity: 0.75;
  }

  .title {
    line-height: 3.2rem;
  }

  .readMore {
    font-weight: 600;
  }
`;

export default function ThreadPostCard({ thread }) {
  const { frontmatter: threadFrontmatter, fields } = thread.node;
  const { conversationId: threadConvo, title, date } = threadFrontmatter;
  const { slug } = fields;

  // 1: Querying for the first tweet in each thread
  const data = useStaticQuery(graphql`
    query {
      allMdx(filter: { frontmatter: { type: { eq: "tweet" }, position: { eq: 1 } } }) {
        edges {
          node {
            frontmatter {
              position
              tweetId
              conversationId
              date(formatString: "MMM Do YYYY")
              images {
                childImageSharp {
                  gatsbyImageData(layout: FULL_WIDTH)
                }
                id
              }
            }
            excerpt(pruneLength: 280)
          }
        }
      }
    }
  `);

  // 2: Finding the required tweet from all of the tweets.
  const allTweets = data.allMdx.edges;
  const [tweetToDispaly] = allTweets.filter(({ node }) => node.frontmatter.conversationId === threadConvo);

  // 3: Destructure values out from required tweet
  const { frontmatter, excerpt } = tweetToDispaly.node;
  const { images } = frontmatter;

  return (
    <ThreadContainer>
      <Link to={slug} className="postLinks">
        {images && <GatsbyImage image={images[0].childImageSharp.gatsbyImageData} />}
        <p className="published">Published on {date}</p>
        <h3 className="title">{title}</h3>
        <p>{excerpt.slice(title.length)}</p>
        <p className="readMore">Click here to read more...</p>
      </Link>
    </ThreadContainer>
  );
}
