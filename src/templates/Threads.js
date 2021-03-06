import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import SEO from '../components/SEO';
import Navigation from '../components/mdx/Navigation';
import Tweet from '../components/mdx/Tweet';
import { ProgressBar } from '../components/mdx/ProgressBar';
import { EmailSignupForm } from '../components/mdx/EmailSignupForm';

const ThreadContainer = styled.div`
  padding-bottom: 5rem;
  width: clamp(300px, 80vw, 700px);

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
      text-align: center;
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
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    margin: auto;
  }
`;

const TwitterThread = ({ data, pageContext, path }) => {
  const { frontmatter } = data.mdx;
  const { title, date, plainDate, tweets } = frontmatter;

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
      <ProgressBar />
      <ThreadContainer>
        <div className="threadHeader">
          <h2 className="title">{title}</h2>
          <p className="author">
            Thread By <a href="https://twitter.com/MrConerMurphy">@MrConerMurphy</a>
          </p>
        </div>
        <article className="threadBody">
          {tweets.map((tweet) => (
            <Tweet tweet={tweet} key={`Twitter-Thread-Tweet-${tweet}`} />
          ))}
        </article>
        <EmailSignupForm />
        <Navigation pageContext={pageContext} />
      </ThreadContainer>
    </>
  );
};

export const query = graphql`
  query ($slug: String!) {
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
