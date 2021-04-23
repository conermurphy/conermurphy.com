import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SEO from '../components/SEO';
import Navigation from '../components/mdx/Navigation';
import useNavTheme from '../utils/useNavTheme';
import TwitterThreadItem from '../components/TwitterThreadItem';

const ThreadContainer = styled.div`
  padding-bottom: 5rem;
  .threadHeader {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-bottom: 5px dashed var(--grey);
    margin: 2.5rem;

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

  .threadBody {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
  }
`;

const TwitterThread = ({ data, pageContext, path }) => {
  const { frontmatter } = data.mdx;
  const { title, date, plainDate, tags, numberOfTweets, tweets } = frontmatter;

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
            Thread By <a href="https://twitter.com/MrConerMurphy">@MrConerMurphy</a>
          </p>
          <div className="threadMetaInfo">
            <p className="date">{date}</p>
            <p className="numberOfTweets">{numberOfTweets} Tweets</p>
          </div>
          <Navigation pageContext={pageContext} />
        </div>
        <article className="threadBody">
          {tweets.map((tweet) => (
            <TwitterThreadItem tweet={tweet} key={`Twitter-Thread-Tweet-${tweet}`} />
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
        replyCount
        quoteCount
        retweetCount
        tweets
        numberOfTweets
      }
    }
  }
`;

export default TwitterThread;

TwitterThread.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string,
        date: PropTypes.string,
        plainDate: PropTypes.string,
        tags: PropTypes.array,
        numberOfTweets: PropTypes.number,
        tweets: PropTypes.array,
      }),
    }),
  }),
  pageContext: PropTypes.object,
  path: PropTypes.string,
};
