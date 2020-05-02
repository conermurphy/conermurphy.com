import React from 'react';
import { useSiteMetadata } from '../hooks/use-site-metadata';

const Header = () => {
  const { title } = useSiteMetadata();
  return <h1>{title}</h1>;
};

export default Header;
