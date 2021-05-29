import styled from 'styled-components';
import React from 'react';
import Tweet from './Tweet';
import { ImageText } from './ImageText';

const H1 = styled.h1``;

const H2 = styled.h2`
<<<<<<< HEAD
  font-size: 2.25rem;
  text-transform: uppercase;
  border-bottom: 2px solid var(--green);
  padding: 1rem 0;
`;

const H3 = styled.h3`
  font-size: 2rem;
  text-transform: uppercase;
  border-bottom: 2px solid var(--green);
=======
  padding: 1rem 0;
  font-weight: bold;
  margin: 0;
  font-size: 3.5rem;
  font-family: 'Open Sans';

  & > a {
    font-size: inherit;
  }
`;

const H3 = styled.h3`
  font-weight: bold;
>>>>>>> redesign-v4
  padding: 1rem 0;
  font-family: 'Open Sans';

  & > a {
    font-size: inherit;
  }
`;

const H4 = styled.h4`
<<<<<<< HEAD
  font-size: 1.75rem;
  text-transform: uppercase;
  border-bottom: 2px solid var(--green);
=======
>>>>>>> redesign-v4
  padding: 1rem 0;
  font-family: 'Open Sans';

  & > a {
    font-size: inherit;
  }
`;

const H5 = styled.h5`
<<<<<<< HEAD
  font-size: 1.75rem;
  text-transform: uppercase;
=======
>>>>>>> redesign-v4
  padding: 1rem 0;
  font-family: 'Open Sans';

  & > a {
    font-size: inherit;
  }
`;

const H6 = styled.h6`
<<<<<<< HEAD
  font-size: 1.5rem;
  text-transform: uppercase;
=======
>>>>>>> redesign-v4
  padding: 1rem 0;
  font-family: 'Open Sans';

  & > a {
    font-size: inherit;
  }
`;

const ALinks = styled.a``;

const HR = styled.hr`
  width: 25%;
  margin: 2.5rem auto;
  border: 0;
  opacity: 0.5;
  border-bottom: 2px solid var(--green);
`;

const Code = styled.code`
<<<<<<< HEAD
=======
  font-family: 'Inconsolata';
  font-weight: 400;
>>>>>>> redesign-v4
  font-size: 1.3rem;
  padding: 1rem;
`;

const InlineCode = styled(Code)`
  background-color: #193549;
  padding: 0.5rem 1rem;
<<<<<<< HEAD
  color: var(--white);
=======
  color: var(--accentText);
>>>>>>> redesign-v4
  white-space: nowrap;
  font-family: 'Inconsolata';
  font-weight: 400;
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
<<<<<<< HEAD
=======
  width: -moz-available;
  width: -webkit-fill-available;
  width: fill-available;
  margin: 2rem 0;
`;

const CustomBlockQuote = styled.blockquote`
  border-left: 5px solid var(--accent);
  background-color: var(--secondaryBg);
  padding: 0.25rem 2rem;
  margin: 0;
>>>>>>> redesign-v4
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
  Tweet: (props) => <Tweet {...props} />,
  ImageText: (props) => <ImageText {...props} />,
  blockquote: (props) => <CustomBlockQuote {...props} />,
};

export default Components;
