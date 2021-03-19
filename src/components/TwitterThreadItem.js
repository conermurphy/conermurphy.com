import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import Components from './mdx/Components';

const TweetContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2.5rem;
  padding: 1rem 2.5rem;
  border: 2px solid var(--grey);
  border-radius: var(--borderRadius);

  .tweetFooter {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 5rem;
    font-size: 1.5rem;

    .viewTweet {
      background-color: #1da1f2;
      color: var(--white);
      border: none;
      padding: 0.75rem 1rem;
      border-radius: calc(var(--borderRadius) / 2);
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

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

  console.log(tweet);

  return (
    <TweetContainer>
      <MDXProvider components={Components}>
        <MDXRenderer>{body}</MDXRenderer>
      </MDXProvider>
      <div className="tweetFooter">
        <p className="date">{date}</p>
        <a className="viewTweet" target="_blank" rel="noopener noreferrer" href={`https://twitter.com/MrConerMurphy/status/${tweetId}`}>
          View On Twitter
        </a>
      </div>
    </TweetContainer>
  );
}
