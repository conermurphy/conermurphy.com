import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Layout from '../components/layout';
import ContentCard from '../components/templates/contentCard';

const WorkContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const Work = ({ data }) => {
  const work = data.dataJson.content;

  return (
    <Layout>
      <WorkContainer>
        <h1>My Work</h1>
        <p style={{ textAlign: 'center' }}>
          Here you'll find all of the recent projects I've been working. Including a mixture of client work and personal projects.
        </p>
        <p style={{ textAlign: 'center' }}>
          If you have any questions about one of my projects or want to chat about working with me then please get in touch.
        </p>
        <PostContainer>
          {work.map(item => {
            const contentData = {
              internal: false,
              link: item.URL,
              topLine: item.technologies,
              title: item.title,
              bottomLine: item.date,
            };
            return <ContentCard data={contentData} key={contentData.title} />;
          })}
        </PostContainer>
      </WorkContainer>
    </Layout>
  );
};

Work.propTypes = {
  data: PropTypes.shape({
    dataJson: PropTypes.shape(
      PropTypes.arrayOf({
        node: PropTypes.shape(
          PropTypes.arrayOf(
            PropTypes.shape({
              URL: PropTypes.string,
              description: PropTypes.string,
              technologies: PropTypes.string,
              title: PropTypes.string,
              type: PropTypes.string,
            })
          )
        ),
      }).isRequired
    ),
  }),
};

export const query = graphql`
  query {
    dataJson(title: { eq: "Portfolio" }) {
      id
      content {
        title
        type
        URL
        description
        technologies
        date
      }
    }
  }
`;

export default Work;
