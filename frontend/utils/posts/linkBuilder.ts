import { ReadonlyURLSearchParams } from 'next/navigation';

interface IProps {
  pageQueries: ReadonlyURLSearchParams;
  item: string;
}

export default function linkBuilder({ pageQueries, item }: IProps): {
  linkHref: string;
  activeItem: boolean;
} {
  const existingQueries = pageQueries.getAll('q')[0]
    ? pageQueries.getAll('q')[0].split(' ')
    : [];

  const activeItem = existingQueries.includes(item);
  let newQueries: string[] = [...existingQueries];

  if (!newQueries.includes(item)) {
    newQueries.push(item);
  } else {
    newQueries = newQueries.filter((query) => query !== item);
  }

  const linkHref = newQueries?.length ? `?q=${newQueries.join('+')}` : '';

  return { linkHref, activeItem };
}
