import React, { useState } from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { FaTwitter } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Components from './Components';

const TweetContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: clamp(300px, 80vw, 700px);

  border-radius: var(--borderRadius);
  background-color: var(--secondaryBg);

  border: 1px solid rgba(0, 0, 0, 0.1);

  overflow: hidden;

  .imagesContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;

    max-width: 660px;
    max-height: 300px;
    overflow: hidden;
    filter: drop-shadow(var(--shadow));
    border-radius: var(--borderRadius);
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
      background-color: var(--secondaryBg);
      cursor: pointer;
      color: var(--primaryText);
    }
  }
`;

const TwitterAuthorContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;

  & > .authorImage {
    width: 5rem;
    border-radius: var(--borderRadius);
  }

  & > div > p {
    margin: 0;
  }

  .author {
    font-weight: bold;
  }

  .username {
    opacity: 50%;
    font-weight: 400;
  }
`;

const CustomGatsbyImage = styled(GatsbyImage)`
  width: ${(props) => (props.imageCount === 1 ? 'clamp(300px, 80vw, 660px)' : '150px')};
  height: ${(props) => (props.imageCount === 1 ? 'auto' : '150px')};
  cursor: pointer;
`;

const LightBoxImageWrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  top: 0;
  left: 0;

  & > .background {
    filter: blur(3px);
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: var(--primaryBg);
    opacity: 95%;
  }

  & .imageContainer > .gatsby-image-wrapper {
    width: clamp(300px, 60vw, 1200px);
    height: clamp(300px, 75vh, 700px);
    filter: drop-shadow(var(--shadow));
    cursor: pointer;
  }
`;

function TwitterAuthor({ author }) {
  const { name, username, image } = author.frontmatter;

  return (
    <a href={`https://twitter.com/${username}`} className="postLinks" target="_blank" rel="noopener noreferrer">
      <TwitterAuthorContainer>
        <GatsbyImage image={image.childImageSharp.gatsbyImageData} objectFit="contain" alt={name} className="authorImage" />
        <div>
          <p className="author">{name}</p>
          <p className="username">@{username}</p>
        </div>
      </TwitterAuthorContainer>
    </a>
  );
}

export default function Tweet({ tweet }) {
  const [lightBoxImage, setLightBoxImage] = useState();
  const [lightBoxImageOpen, setLightBoxImageOpen] = useState(false);
  // Function to copy link to tweet on Twitter to clipboard
  function handleClick(link) {
    navigator.clipboard.writeText(link);
  }

  // Handle Opening image in a light box
  function handleImageClick(img) {
    if (!lightBoxImageOpen) {
      setLightBoxImage(img);
      setLightBoxImageOpen(true);
      return;
    }
    setLightBoxImage(null);
    setLightBoxImageOpen(false);
  }

  function LightBoxImageContainer({ title }) {
    return lightBoxImageOpen ? (
      <LightBoxImageWrapper>
        <div className="background" />
        <motion.div
          className="imageContainer"
          onClick={() => handleImageClick()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            type: 'spring',
            mass: 0.5,
            stiffness: 75,
            duration: 0.3,
          }}
        >
          <GatsbyImage image={lightBoxImage.childImageSharp.gatsbyImageData} objectFit="contain" alt={title} />
        </motion.div>
      </LightBoxImageWrapper>
    ) : null;
  }

  // 1: Querying for all tweets in all threads as unable to pass variables to static queries.
  const data = useStaticQuery(graphql`
    query {
      tweets: allMdx(filter: { frontmatter: { type: { eq: "tweet" } } }) {
        edges {
          node {
            frontmatter {
              position
              tweetId
              authorId
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
      authors: allMdx(filter: { frontmatter: { type: { eq: "author" } } }) {
        edges {
          node {
            frontmatter {
              authorId
              name
              username
              image {
                childImageSharp {
                  gatsbyImageData(layout: FULL_WIDTH)
                }
                id
              }
            }
          }
        }
      }
    }
  `);

  // 2a: Finding the required tweet from all of the tweets.
  const allTweets = data.tweets.edges;
  const [tweetToDispaly] = allTweets.filter(({ node }) => node.frontmatter.tweetId === tweet);

  // 2b: Destructure values out from required tweet
  const { body, frontmatter } = tweetToDispaly.node;
  const { tweetId, images, links, date, authorId } = frontmatter;

  // 3a: Finding the required author from all of the authors.
  const author = authorId !== null ? authorId : '1249718482436055044';
  const allAuthors = data.authors.edges;
  const [authorToDisplay] = allAuthors.filter(({ node }) => node.frontmatter.authorId === author);

  // 3b: Destructure values out from required author
  const { username } = authorToDisplay.node.frontmatter;

  const tweetLink = `https://twitter.com/${username}/status/${tweetId}`;

  return (
    <TweetContainer>
      <LightBoxImageContainer title={body.slice(0, 20)} />
      <div className="tweetHeader">
        <TwitterAuthor author={authorToDisplay.node} />
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
          {images &&
            images.map((image, i) => (
              <div onClick={() => handleImageClick(image)} key={`${tweetId}-${i}`}>
                <CustomGatsbyImage image={image.childImageSharp.gatsbyImageData} imageCount={images.length} alt={body.slice(0, 50)} />
              </div>
            ))}
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
