import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import SEO from '../components/seo';
import Layout from '../components/layout';

const BlogContainerOuter = styled.div`
  display: flex;
  flex-direction: column;

  & > a {
    color: black;
    transition: 0.5s;
  }

  & > a:hover {
    transform: scale(1.1, 1.1);
  }
`;

const Blog = () => {
  const data = useStaticQuery(
    graphql`
      query {
        writing: allMarkdownRemark(
          sort: { order: DESC, fields: frontmatter___date }
          filter: { fileAbsolutePath: { regex: "/(posts)/.*\\\\.md$/" } }
        ) {
          edges {
            node {
              id
              frontmatter {
                date(formatString: "DDMMYYYY")
                title
                description
                id
                authorid
                languages
                category
                tags
              }
              fields {
                slug
              }
              excerpt
              timeToRead
            }
          }
        }
      }
    `
  );

  return (
    <Layout>
      <SEO title="Coner Murphy | Blog" />
      <main id="blog">
        <h2>BLOG</h2>
        <p>
          Everything Front-End related. HTML, CSS, JS and more. If you see something interesting or want to request a topic, please{' '}
          <Link to="/#contact">contact me.</Link>
        </p>
        <BlogContainerOuter>
          {data.writing.edges.map(({ node }) => (
            <Link to={node.fields.slug} style={{ textDecoration: 'none' }} key={node.id}></Link>
          ))}
        </BlogContainerOuter>
      </main>
    </Layout>
  );
};

export default Blog;
