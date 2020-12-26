import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { GrCss3, GrHtml5, GrJs, GrReactjs, GrGatsbyjs, GrGraphQl, GrNode } from 'react-icons/gr';

const IconContainer = styled.div`
  height: ${(props) => (props.width ? props.width : '5rem')};
  & > svg {
    width: ${(props) => (props.width ? props.width : '5rem')};
    height: auto;
    transition: 0.5s all ease-in-out;
  }
`;

const languages = {
  HTML: <GrHtml5 style={{ stroke: 'hsl(12, 77%, 52%)' }} data-label="HTML" aria-label="HTML Icon" />,
  CSS: <GrCss3 style={{ stroke: 'rgb(38, 77, 228)' }} data-label="CSS" aria-label="CSS Icon" />,
  JavaScript: <GrJs style={{ backgroundColor: 'yellow' }} data-label="JavaScript" aria-label="JavaScript Icon" />,
  NodeJS: <GrNode style={{ color: 'rgb(68, 136, 62)' }} data-label="NodeJS" aria-label="NodeJS Icon" />,
  ReactJS: <GrReactjs style={{ color: '#61dafb' }} data-label="ReactJS" aria-label="ReactJS Icon" />,
  GatsbyJS: <GrGatsbyjs style={{ color: 'rgb(102 51 153' }} data-label="GatsbyJS" aria-label="GatsbyJS Icon" />,
  GraphQL: <GrGraphQl style={{ color: '#E10098' }} data-label="GraphQL" aria-label="GraphQL Icon" />,
};

export const languageList = Object.keys(languages);

export default function LanguageIcons({ language, width }) {
  return <IconContainer width={width}>{languages[language.trim()]}</IconContainer>;
}
