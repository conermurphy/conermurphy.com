import styled from 'styled-components';
import React from 'react';

const H1 = styled.h1`
  font-size: 2.75rem;
`;

const H2 = styled.h2`
  font-size: 2.25rem;
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
  font-size: 1.75rem;
  text-transform: uppercase;
  font-family: var(--body-font);
  border-bottom: 2px solid var(--green);
  padding: 1rem 0;
`;

const H5 = styled.h5`
  font-size: 1.75rem;
  text-transform: uppercase;
  font-family: var(--body-font);
  padding: 1rem 0;
`;

const H6 = styled.h6`
  font-size: 1.5rem;
  text-transform: uppercase;
  font-family: var(--body-font);
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

const InlineCode = styled(Code)`
  background-color: #193549;
  padding: 0.5rem 1rem;
  color: var(--white);
  font-weight: bold;
  white-space: nowrap;
`;

const Pre = styled.pre`
  padding: 1rem;
  white-space: break-spaces;
`;

const UL = styled.ul`
  list-style-type: circle;
  padding-left: 1rem;
`;

const CustomIMG = styled.img`
  width: 100%;
  width: -moz-available;
  width: -webkit-fill-available;
  width: fill-available;
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
  h5: (props) => (
    <H5 id={props.children.replace(' ', '-').toLowerCase()}>
      <a href={`#${props.children.replace(' ', '-').toLowerCase()}`} onClick={() => copyToClip()}>
        {props.children}
      </a>
    </H5>
  ),
  h6: (props) => (
    <H6 id={props.children.replace(' ', '-').toLowerCase()}>
      <a href={`#${props.children.replace(' ', '-').toLowerCase()}`} onClick={() => copyToClip()}>
        {props.children}
      </a>
    </H6>
  ),
  pre: (props) => <Pre {...props} />,
  a: (props) => <ALinks {...props} />,
  hr: (props) => <HR {...props} />,
  code: (props) => <Code {...props} />,
  inlineCode: (props) => <InlineCode {...props} />,
  ul: (props) => <UL {...props} />,
  img: (props) => <CustomIMG {...props} />,
};

export default Components;
