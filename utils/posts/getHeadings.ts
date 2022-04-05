import { PostHeading } from '../../types';
import getHeadingLink from './getHeadingLink';

export default function getHeadings(source: string): PostHeading[] {
  // The base of this function is from https://twitter.com/joshwcomeau/status/1334649414812659715?lang=en-GB

  const headingRegex = /^###*\s/gm;
  const firstLetterRegex = /[^#]/g;

  // Get each line individually, and filter out anything that
  // isn't a heading.
  const headingLines = source.split('\n').filter((line) => {
    return line.match(headingRegex);
  });

  // Transform the string '## Some text' into an object
  // with the shape '{ text: 'Some text', level: 2 }'
  return headingLines.map((raw) => {
    const text = raw.replace(headingRegex, '');

    const [headingLevel] = raw.split(firstLetterRegex);
    const level = headingLevel.length;

    const link = `#${getHeadingLink(text)}`;

    return { text, level, link };
  });
}
