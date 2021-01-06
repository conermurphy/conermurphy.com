import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import useNavTheme from '../utils/useNavTheme';

export default function Reads() {
  // Setting the nav theme for this page
  useNavTheme('dark');

  return (
    <div>
      <div className="headerTitleSeperator">
        <h1>Reads</h1>
      </div>
      <p>Page coming soon!</p>
    </div>
  );
}
