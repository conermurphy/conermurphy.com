import React from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/layout';
import { useSiteMetadata } from '../hooks/use-site-metadata';
import Logo from '../components/logo';

const Index = () => {
  const { title, description } = useSiteMetadata();
  return (
    <Layout>
      <div>
        <Logo height="15vh" />
        <h1>{title}</h1>
        <h2>{description}</h2>
        <div></div>
      </div>
    </Layout>
  );
};

export default Index;
