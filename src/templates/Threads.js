import React, { useEffect, useRef } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Chart from 'chart.js';
import SEO from '../components/SEO';
import Tags from '../components/Tags';
import Navigation from '../components/mdx/Navigation';
import useNavTheme from '../utils/useNavTheme';
import TwitterThreadItem from '../components/TwitterThreadItem';

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

  .threadBody {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    justify-content: center;
    align-items: flex-start;
  }
`;

function ThreadStatsChart({ data: threadData }) {
  const chartRef = useRef(null);
  useEffect(() => {
    // Check if window is undefined or not to prevent build issues
    if (typeof window !== 'undefined' && threadData) {
      // If the chart is not undefined, upon re-render destroy the old chart.
      if (typeof window.threadStatsChart !== 'undefined') {
        window.threadStatsChart.destroy();
      }

      // Setting base object for chart options.
      const chartOptions = {
        legend: {
          display: false,
          labels: {},
        },
      };

      // Create properties for the chart to be set below.
      // Creating an array of labels by flattening the keys of the data.
      const labels = Object.keys(threadData)
        .flat()
        // Capatilising the first letter of the sentence, removing the 'Count' word and appending (s)
        .map((label) => `${label.charAt(0).toUpperCase() + label.slice(1).split('Count')[0]}(s)`);
      // Merging all of the data into one array
      const data = Object.values(threadData).flat();
      // Creating an array equal to the length of the data array and filling with the same background colour.
      const backgroundColor = Array.from({ length: data.length }).map((_, i) => '#1da1f2');

      // Setting the properties onto the chart.
      const chartData = {
        labels,
        datasets: [
          {
            data,
            backgroundColor,
          },
        ],
      };

      // Creating the chart.
      window.threadStatsChart = new Chart(chartRef.current, {
        type: 'bar',
        data: chartData,
        options: chartOptions,
      });
      if (typeof window.threadStatsChart !== 'undefined') {
        window.threadStatsChart.update();
      }
    }
  }, []);
  return <canvas ref={chartRef} />;
}

const TwitterThread = ({ data, pageContext, path }) => {
  const { frontmatter } = data.mdx;
  const {
    title,
    date,
    plainDate,
    tags,
    conversationId,
    likeCount,
    replyCount,
    quoteCount,
    retweetCount,
    numberOfTweets,
    tweets,
  } = frontmatter;

  // Updating the nav to show dark theme.
  useNavTheme('dark');

  const chartData = { likeCount, replyCount, quoteCount, retweetCount };

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
          <ThreadStatsChart data={chartData} />
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
