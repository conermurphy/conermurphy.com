/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { Highlight, Language, Prism } from 'prism-react-renderer';
import { copyToClipboard, getIcon } from '../../../../utils';
import { ICONS } from '../../../../constants';

export function Code({
  children,
  className: codeClassName,
}: {
  children: string;
  className?: string;
}): JSX.Element {
  const [isCodeCopied, setCodeCopied] = useState(false);

  const [language, lines = '[]', fileName, icon]: Language | string[] =
    codeClassName?.replace(/language-/, '')?.split(':') || '';

  let highlightedLines: number[] = [];

  if (lines.includes('-')) {
    const range = lines.slice(1, -1);
    const [start, end] = range.split('-').map(Number);

    if (!Number.isNaN(start) && !Number.isNaN(end) && start <= end) {
      highlightedLines = Array.from(
        { length: end - start + 1 },
        (_, i) => start + i
      );
    }
  } else {
    highlightedLines =
      lines !== undefined ? (JSON.parse(lines) as number[]) : [];
  }

  const code = children.trim() || '';

  return (
    <Highlight prism={Prism} code={code} language={language || ''}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div>
          {fileName ? (
            <div className="bg-[#1a2833] select-none pt-3 rounded-t-lg">
              <div className="flex flex-row items-center gap-2 w-max bg-[#223545] pb-2 pt-2 px-4 ml-4 rounded-t-md">
                {icon ? getIcon({ icon, size: '12px' }) : null}
                <span className="text-xs text-[#f8f8f2]">{fileName}</span>
              </div>
            </div>
          ) : null}
          <div className="relative group mb-6" style={{ color: undefined }}>
            <pre
              className={`${className} ${fileName ? '' : 'my-6 md:my-8'} ${
                fileName ? 'rounded-b-lg' : 'rounded-lg'
              } text-sm drop-shadow-lg leading-relaxed`}
              style={{ ...style, backgroundColor: undefined, color: undefined }}
            >
              <code>
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
              </code>
            </pre>
            <span className="absolute top-1.5 right-3 select-none text-background text-xs md:text-sm">
              {language}
            </span>
            <button
              type="button"
              className="hidden group-hover:block absolute bottom-3 right-3 bg-background p-1.5 rounded-md"
              onClick={async () => {
                await copyToClipboard(code);

                setCodeCopied(true);
                setTimeout(() => {
                  setCodeCopied(false);
                }, 1500);
              }}
            >
              {isCodeCopied
                ? getIcon({ icon: ICONS.TICK.name, size: '18px' })
                : getIcon({ icon: ICONS.COPY.name, size: '18px' })}
            </button>
          </div>
        </div>
      )}
    </Highlight>
  );
}
