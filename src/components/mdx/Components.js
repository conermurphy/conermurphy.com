import styled from 'styled-components';
import React from 'react';

const H1 = styled.h1`
  font-size: 2.75rem;
`;

const H2 = styled.h2`
  font-size: 2rem;
  text-transform: uppercase;
  font-family: var(--body-font);
  border-bottom: 2px solid var(--green);
  padding: 1rem 0;
  font-weight: bold;
`;

const H3 = styled.h3`
  font-size: 2rem;
  text-transform: uppercase;
  font-family: var(--body-font);
  font-weight: bold;
  border-bottom: 2px solid var(--green);
  padding: 1rem 0;
`;

const H4 = styled.h4`
  font-size: 2rem;
  text-transform: uppercase;
  font-family: var(--body-font);
  border-bottom: 2px solid var(--green);

  padding: 1rem 0;
`;

const ALinks = styled.a`
  font-weight: bold;
`;

const HR = styled.hr`
  width: 25%;
  margin: 2.5rem auto;
  border: 0;
  opacity: 0.5;
  border-bottom: 2px solid var(--green);
`;

const Code = styled.code`
  font-family: var(--body-font);
  font-size: 1.3rem;
  padding: 1rem;
`;

const Pre = styled.pre`
  padding: 1rem;
  white-space: break-spaces;
`;

function copyToClip() {
  navigator.clipboard.writeText(window.location);
}

const Components = {
  h1: (props) => (
    <H1 id={props.children.replace(' ', '-').toLowerCase()}>
      <a href={`#${props.children.replace(' ', '-').toLowerCase()}`} onClick={() => copyToClip()}>
        {props.children}
      </a>
    </H1>
  ),
  h2: (props) => (
    <H2 id={props.children.replace(' ', '-').toLowerCase()}>
      <a href={`#${props.children.replace(' ', '-').toLowerCase()}`} onClick={() => copyToClip()}>
        {props.children}
      </a>
    </H2>
  ),
  h3: (props) => (
    <H3 id={props.children.replace(' ', '-').toLowerCase()}>
      <a href={`#${props.children.replace(' ', '-').toLowerCase()}`} onClick={() => copyToClip()}>
        {props.children}
      </a>
    </H3>
  ),
  h4: (props) => (
    <H4 id={props.children.replace(' ', '-').toLowerCase()}>
      <a href={`#${props.children.replace(' ', '-').toLowerCase()}`} onClick={() => copyToClip()}>
        {props.children}
      </a>
    </H4>
  ),
  pre: (props) => <Pre {...props} />,
  a: (props) => <ALinks {...props} />,
  hr: (props) => <HR {...props} />,
  code: (props) => <Code {...props} />,
};

export default Components;

