import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { GatsbyImage } from 'gatsby-plugin-image';
import { motion } from 'framer-motion';

const ThreadContainer = styled(motion.div)`
  width: clamp(300px, 80vw, 400px);

  .gatsby-image-wrapper {
    max-width: 400px;
    border-radius: var(--borderRadius);
  }

  .published {
    font-size: 1.3rem;
    margin: 0.5rem 0;
    font-weight: 300;
    opacity: 0.75;
  }

  .threadTitle {
    max-width: 400px;
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
    <ThreadContainer whileHover={{ scale: 1.025 }} whileTap={{ scale: 0.975 }}>
      <Link to={slug} className="postLinks">
        {images && <GatsbyImage image={images[0].childImageSharp.gatsbyImageData} alt={title} />}
        <p className="published">Published on {date}</p>
        <h3 className="title threadTitle">{title}</h3>
        <p>{excerpt.slice(title.length)}</p>
        <p className="readMore">Click here to read more...</p>
      </Link>
    </ThreadContainer>
  );
}
