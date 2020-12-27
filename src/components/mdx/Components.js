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
  width: max-content;
`;

const H4 = styled.h4`
  font-size: 2rem;
  text-transform: uppercase;
  font-family: var(--body-font);
  border-bottom: 2px solid var(--green);
  width: max-content;
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

/* eslint-disable */
const Components = {
    h1: (props) => <H1 {...props} />,
    h2: (props) => <H2 {...props} />,
    h3: (props) => <H3 {...props} />,
    h4: (props) => <H4 {...props} />,
    pre: (props) => <Pre {...props} />,
    a: (props) => <ALinks  {...props} />,
    hr: (props) => <HR {...props}/>,
    code: (props) => <Code {...props} />,
};
/* eslint-enable */

export default Components;
