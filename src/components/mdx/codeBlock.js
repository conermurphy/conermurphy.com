import React from 'react';
import PropTypes from 'prop-types';
import Highlight, { defaultProps } from 'prism-react-renderer';

const CodeBlock = ({ children }) => (
  <Highlight {...defaultProps} code={children} language="jsx" theme={undefined}>
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre className={className} style={{ ...style, padding: '20px' }}>
        {tokens.map((line, i) => (
          <div key={i} {...getLineProps({ line, key: i })}>
            {line.map((token, key) => (
              <span key={key} {...getTokenProps({ token, key })} />
            ))}
          </div>
        ))}
      </pre>
    )}
  </Highlight>
);

CodeBlock.propTypes = {
  children: PropTypes.string.isRequired,
};

export default CodeBlock;
