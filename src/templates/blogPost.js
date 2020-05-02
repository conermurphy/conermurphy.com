import React from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import PropTypes from 'prop-types';
import Layout from '../components/layout';

const BlogPost = ({ data }) => {
  console.log(data);
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
};

export default BlogPost;
