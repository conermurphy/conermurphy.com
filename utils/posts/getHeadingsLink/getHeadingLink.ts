import { ReactElement } from 'react';

export default function getHeadingLink(
  children: string | ReactElement | (string | ReactElement)[]
): string {
  let stringToProcess = '';

  if (Array.isArray(children)) {
    stringToProcess = children
      .map((child) => {
        if (typeof child === 'string') {
          return child;
        }

        const childProps = child.props as { children: string };
        return childProps.children;
      })
      .join('');
  }

  if (typeof children !== 'string' && !Array.isArray(children)) {
    const childProps = children.props as { children: string };
    stringToProcess = childProps.children;
  }

  if (typeof children === 'string' && !Array.isArray(children)) {
    stringToProcess = children;
  }

  const returnString = stringToProcess
    // Regex to remove all punctionation from the original string
    .replace(/['!"#$%&\\'()\\*+,\\.\\/:;<=>?@\\[\\\]\\^_`{|}~']/g, '')
    // Convert any spaces to '-'
    .replace(/ /g, '-')
    // Replace any '--' to a '-'
    .replace(/(--)/g, '-')
    // Replace all emojis to blank spaces
    .replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
      ''
    )
    // Make it all lower case
    .toLowerCase();

  return returnString.endsWith('-') ? returnString.slice(0, -1) : returnString;
}
