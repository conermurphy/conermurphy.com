import { PostHeading } from '../../types';
import { getHeadingLink } from '.';
import type { IProps } from '../../components/Post/PostComponents/Components';
import { getHeadingContent } from './get-heading-content';

export function getHeadingRef(
  headings: PostHeading[],
  children: IProps['children']
) {
  return headings.find((heading) => {
    if (typeof children === 'string') {
      return heading.text === getHeadingContent(children);
    }

    return getHeadingLink(heading.text) === getHeadingContent(children);
  })?.ref;
}
