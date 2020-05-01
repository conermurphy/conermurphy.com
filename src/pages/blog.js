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

const Blog = () => <h1>Hello World Blog!</h1>;

export default Blog;
