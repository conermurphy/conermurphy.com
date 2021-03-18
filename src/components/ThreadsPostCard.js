import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import matchingLanguageIcon from '../utils/findMatchingLanguageIcon';
import Tags from './Tags';

export default function ThreadPostCard({ thread }) {
  const { frontmatter, fields } = thread.node;
  const { title, date, tag, numberOfTweets, retweetCount, likeCount } = frontmatter;
  return <p>{title}</p>;
}
