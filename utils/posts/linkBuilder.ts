interface IProps {
  pageQueries: { page: string; queries: string[] };
  item: string;
  pathname: string;
}

export default function linkBuilder({ pageQueries, item, pathname }: IProps): {
  linkHref: string;
  activeItem: boolean;
} {
  const { page, queries } = pageQueries;
  let linkHref = '';

  // Determine if the current item is already selected or not
  const activeItem = queries.includes(item);

  // Generate the new tag/category URL that either appends new items or removes the current active one.
  const newQueries = queries
    .reduce((acc: string[], cur: string) => {
      if (cur === item) {
        return acc;
      }

      if (!acc.includes(item.toLowerCase()) && !activeItem) {
        acc.push(item.toLowerCase());
      }

      acc.push(cur.toLowerCase());

      return acc;
    }, [])
    .join('+');

  // 0 active query items URL
  if (queries.length === 0) {
    linkHref = `?q=${item.toLowerCase()}`;
  }

  // 1 active query item URL
  if (queries.length === 1) {
    if (page && activeItem) {
      linkHref = `?page=${page}`;
    } else if (!page && activeItem) {
      linkHref = `/${pathname}`;
    } else if (page && !activeItem) {
      linkHref = `?q=${newQueries}`;
    } else if (!page) {
      linkHref = `?q=${newQueries}`;
    }
  }

  // 2+ active query items URL
  if (queries.length >= 2) {
    linkHref = `?q=${newQueries}`;
  }

  return { linkHref, activeItem };
}
