import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import Components from './mdx/Components';

export default function TwitterThreadItem({ tweet }) {
  // 1: Querying for all tweets in all threads as unable to pass variables to static queries.
  const data = useStaticQuery(graphql`
    query {
      allMdx(filter: { frontmatter: { type: { eq: "tweet" } } }) {
        edges {
          node {
            frontmatter {
              position
              tweetId
              date(formatString: "DD/MM/YYYY HH:mm")
              media {
                childrenImageSharp {
                  fluid(maxWidth: 800) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            body
          }
        }
      }
    }
  `);

  // 2: Finding the required tweet from all of the tweets.
  const allTweets = data.allMdx.edges;
  const [tweetToDispaly] = allTweets.filter(({ node }) => node.frontmatter.tweetId === tweet);

  // 3: Destructure values out from required tweet
  const { body, frontmatter } = tweetToDispaly.node;
  const { position, tweetId, date, media } = frontmatter;

  return (
    <div className="tweetContainer">
      <MDXProvider components={Components}>
        <MDXRenderer>{body}</MDXRenderer>
      </MDXProvider>
    </div>
  );
}
