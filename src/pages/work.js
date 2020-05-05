import React, { useState } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Layout from '../components/layout';
import BlogPostCard from '../components/blogPostCard';

const WorkContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Work = ({ data }) => {
  console.log(data.allDataJson.edges);
  return (
    <Layout>
      <WorkContainer>
        <h1>Recent Projects</h1>
        <p style={{ textAlign: 'center' }}>
          Here you'll find all of the recent projects I've been working. Including a mixture of client work and personal projects.
        </p>
        <p style={{ textAlign: 'center' }}>
          If you have any questions about one of my projects or want to chat about working with me then please get in touch.
        </p>
      </WorkContainer>
    </Layout>
  );
};

Work.propTypes = {
  data: PropTypes.shape({
    allDataJson: PropTypes.shape(
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
    allDataJson {
      edges {
        node {
          title
          content {
            type
            title
            URL
            description
            technologies
          }
        }
      }
    }
  }
`;

export default Work;
