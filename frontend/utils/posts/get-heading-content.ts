import { getHeadingLink } from '.';
import type { IProps } from '../../components/Post/PostComponents/Components';

export function getHeadingContent(children: IProps['children']) {
  if (typeof children === 'string') {
    return children;
  }

  if (Array.isArray(children)) {
    return children[0];
  }

  const childProps = children?.props as { children: string };

  return getHeadingLink(childProps?.children);
}
