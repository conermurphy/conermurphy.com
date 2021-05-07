import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { FaTwitter } from 'react-icons/fa';
import Components from './mdx/Components';
import { useSiteMetadata } from '../utils/useSiteMetadata';

const TweetContainer = styled.div`
  display: flex;
  flex-direction: column;

  max-width: 600px;

  border-radius: var(--borderRadius);
  background-color: var(--primaryBg);

  border: 1px solid rgba(0, 0, 0, 0.1);

  overflow: hidden;

  .imagesContainer {
    max-width: 550px;
    max-height: 300px;
    overflow: hidden;
  }

  .tweetHeader {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 2rem;
    margin-bottom: 0;
  }

  .tweetBody {
    margin: 2rem;
    & > p {
      margin: 1rem 0;
    }
  }

  /* For Twitter Logo */
  .twitterLogo {
    color: #08a0e9;
    width: 3rem;
    height: 3rem;
  }

  .tweetFooter {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;

    border-top: 1px solid rgba(0, 0, 0, 0.1);

    & > p {
      margin: 1rem;
      padding: 1rem 0;
      font-size: 1.4rem;
    }

    & > .copyTweetLink {
      border: none;
      background-color: var(--primaryBg);
      cursor: pointer;
    }
  }
`;

const TwitterAuthorContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;

  & > img {
    width: 5rem;
  }

  & > div > p {
    margin: 0;
  }

  .author {
    font-weight: bold;
  }
`;

function TwitterAuthor() {
  const { title, image, twitterUsername } = useSiteMetadata();
  return (
    <a href="https://twitter.com/MrConerMurphy" className="postLinks" target="_blank" rel="noopener noreferrer">
      <TwitterAuthorContainer>
        <img src={image} alt={title} />
        <div>
          <p className="author">{title}</p>
          <p>{twitterUsername}</p>
        </div>
      </TwitterAuthorContainer>
    </a>
  );
}

export default function TwitterThreadItem({ tweet }) {
  // Function to copy link to tweet on Twitter to clipboard
  function handleClick(link) {
    navigator.clipboard.writeText(link);
  }

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
              images {
                childImageSharp {
                  gatsbyImageData(layout: FULL_WIDTH)
                }
                id
              }
              links
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
  const { tweetId, images, links, date } = frontmatter;

  const tweetLink = `https://twitter.com/MrConerMurphy/status/${tweetId}`;

  return (
    <TweetContainer>
      <div className="tweetHeader">
        <TwitterAuthor />
        <a href={tweetLink} target="_blank" rel="noopener noreferrer">
          <FaTwitter className="twitterLogo" />
        </a>
      </div>
      <div className="tweetBody">
        <MDXProvider components={Components}>
          <MDXRenderer>{body}</MDXRenderer>
        </MDXProvider>
        {!!links && (
          <p style={{ paddingBottom: 0, marginBottom: 0 }}>
            <b>🔗 Links in this Tweet:</b>
          </p>
        )}
        {!!links && (
          <ul style={{ paddingTop: 0, marginTop: 0 }}>
            {links.map((link) => (
              <li key={`TwitterThreadLink:${link}`}>
                <a href={link}>{link}</a>
              </li>
            ))}
          </ul>
        )}
        <div className="imagesContainer">
          {images && images.map((image) => <GatsbyImage image={image.childImageSharp.gatsbyImageData} imageCount={images.length} />)}
        </div>
      </div>
      <div className="tweetFooter">
        <p>{date}</p>
        <button type="button" className="copyTweetLink" onClick={() => handleClick(tweetLink)}>
          🔗 Copy the link to this tweet
        </button>
      </div>
    </TweetContainer>
  );
}
