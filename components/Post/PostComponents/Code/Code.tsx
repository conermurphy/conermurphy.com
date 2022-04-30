/* eslint-disable react/no-array-index-key */
import React from 'react';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import { getIcon } from '../../../../utils';

interface CodeBlockProps {
  children: {
    props: {
      children: string;
      className: string;
    };
  };
}

export default function Code({ children }: CodeBlockProps): JSX.Element {
  const [language, lines, fileName, icon]: Language | string[] =
    children.props.className?.replace(/language-/, '')?.split(':') || '';

  const highlightedLines =
    lines !== undefined ? (JSON.parse(lines) as number[]) : [];

  return (
    <Highlight
      Prism={defaultProps.Prism}
      theme={undefined}
      code={children.props.children.trim()}
      language={language as Language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => {
        return (
          <>
            {fileName ? (
              <div className="bg-[#111827] select-none pt-3 rounded-t-lg">
                <div className="flex flex-row items-center gap-2 w-min bg-[#223545] pb-2 pt-2 px-4 ml-4 rounded-t-md">
                  {icon ? getIcon({ icon, size: '12px' }) : null}
                  <span className="text-xs text-[#f8f8f2]">{fileName}</span>
                </div>
              </div>
            ) : null}
            <div className="relative mb-6">
              <pre
                className={`${className} ${fileName ? '' : 'my-6 md:my-8'} ${
                  fileName ? 'rounded-b-lg' : 'rounded-lg'
                } text-sm md:text-base drop-shadow-lg`}
                style={{ ...style }}
              >
                {tokens.map((line, index) => {
                  const lineProps = getLineProps({ line, key: index });
                  const lineNumber = index + 1;
                  const isLineHighlighted =
                    highlightedLines.includes(lineNumber);

                  return (
                    <div
                      key={`item-${index}`}
                      className={`${lineProps.className} ${
                        isLineHighlighted ? 'line-highlighted' : ''
                      }`}
                      style={lineProps.style}
                    >
                      <span
                        className={`pr-4 opacity-75 select-none ${
                          isLineHighlighted ? 'pl-3' : 'pl-4'
                        }`}
                      >
                        {lineNumber}
                      </span>
                      {line.map((token, key) => {
                        const tokenProps = getTokenProps({ token, key });
                        return (
                          <span
                            key={`line-${key}`}
                            style={tokenProps.style}
                            className={tokenProps.className}
                          >
                            {tokenProps.children}
                          </span>
                        );
                      })}
                    </div>
                  );
                })}
              </pre>
              <span className="absolute top-1.5 right-3 select-none text-[#f8f8f2] text-xs md:text-sm">
                {language}
              </span>
            </div>
          </>
        );
      }}
    </Highlight>
  );
}
