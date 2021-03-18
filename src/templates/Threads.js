import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SEO from '../components/SEO';
import Tags from '../components/Tags';
import Navigation from '../components/mdx/Navigation';
import useNavTheme from '../utils/useNavTheme';

const ThreadContainer = styled.div`
  .threadHeader {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-bottom: 5px dashed var(--grey);

    .title {
      font-size: 2.25rem;
      margin-bottom: 0;
      padding-bottom: 0;
    }

    .author {
      font-size: 1.5rem;
      padding: 0;
      margin: 0.5rem;
      margin-bottom: 0;
    }

    .threadMetaInfo {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 1rem;

      & > p {
        padding: 0;
        margin: 2rem 0;
      }

      .date {
        padding-right: 1rem;
        border-right: 1px solid var(--black);
      }
    }
  }
`;

const TwitterThread = ({ data, pageContext, path }) => {
  const { frontmatter } = data.mdx;
  const { title, date, plainDate, tags, conversationId, likeCount, retweetCount, numberOfTweets, tweets } = frontmatter;

  // Updating the nav to show dark theme.
  useNavTheme('dark');

  return (
    <>
      <SEO
        post={{
          slug: path,
          title,
          article: true,
          date: plainDate,
        }}
      />
      <ThreadContainer>
        <div className="threadHeader">
          <h2 className="title">{title}</h2>
          <p className="author">
            Tweet By <a href="https://twitter.com/MrConerMurphy">@MrConerMurphy</a>
          </p>
          <div className="threadMetaInfo">
            <p className="date">{date}</p>
            <p className="numberOfTweets">{numberOfTweets} Tweets</p>
          </div>
          <Tags tags={tags} />
          {/* Insert Chart.JS graph showing number of likes / retweets on this thread */}
          <Navigation pageContext={pageContext} />
        </div>
        <article className="threadBody">
          {tweets.map((tweet) => (
            <p>{tweet}</p>
          ))}
        </article>
      </ThreadContainer>
    </>
  );
};

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      fields {
        filePath
        contentCategory
        slug
      }
      frontmatter {
        title
        date(formatString: "DD/MM/YYYY HH:mm")
        plainDate: date
        tags
        conversationId
        likeCount
        retweetCount
        tweets
        numberOfTweets
      }
    }
  }
`;

export default TwitterThread;
