import React from 'react';
import styled from 'styled-components';
import '../styles/global.css';
import PropTypes from 'prop-types';
import { useSiteMetadata } from '../hooks/use-site-metadata';

const Header = () => {
  const { title } = useSiteMetadata();
  return <h1>{title}</h1>;
};

export default Header;
