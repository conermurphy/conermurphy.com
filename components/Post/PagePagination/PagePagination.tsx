import { useRouter } from 'next/router';
import React from 'react';
import NoScrollLink from '../../NoScrollLink/NoScrollLink';

interface IProps {
  pageCount: number;
  currentPage: number;
  pageQueries: { page: string; queries: string[] };
}

interface PageNumberProps {
  pageNumber: number;
  routeBase: string;
  pageQueries: { page: string; queries: string[] };
}

const disabledLinkStyles =
  'opacity-50 select-none pointer-events-none line-through';
const enabledLinkStyles = 'opacity-75';
const pageNumberStyles =
  'flex items-center justify-center rounded w-8 h-8 opacity-75';

// Function to generate the URL version of the queries.
const queriesLink = (queries: string[]) =>
  queries?.length ? `${queries.map((q) => q.toLowerCase()).join('+')}` : '';

function PageNumber({
  pageNumber,
  routeBase,
  pageQueries,
}: PageNumberProps): JSX.Element {
  const { page, queries } = pageQueries;

  const activePage =
    page === pageNumber.toString() || (page === '' && pageNumber === 1);

  const queryLink = queriesLink(queries);

  return (
    <NoScrollLink
      href={`${
        pageNumber === 1
          ? `${routeBase}${queryLink ? `?q=${queryLink}` : ''}`
          : `${routeBase}?page=${pageNumber}${
              queryLink ? `&q=${queryLink}` : ''
            }`
      }`}
      key={pageNumber}
      passHref
    >
      <a
        className={`text-sm font-semibold ${pageNumberStyles} ${
          activePage
            ? 'bg-accent dark:bg-accent/75'
            : 'bg-primaryBgDark/10 hover:bg-accent hover:dark:bg-accent/75'
        }`}
        data-testid="pagination-number"
      >
        {pageNumber}
      </a>
    </NoScrollLink>
  );
}

export default function PagePagination({
  pageCount,
  currentPage,
  pageQueries,
}: IProps): JSX.Element {
  const { pathname } = useRouter();
  const { queries } = pageQueries;

  const queryLink = queriesLink(queries);

  const hasPrevLink = currentPage !== 0;
  const hasNextLink = pageCount >= 2 && currentPage !== pageCount;

  const prevLink = `${pathname}${
    currentPage - 1 <= 1
      ? `${queryLink ? `?q=${queryLink}` : ''}`
      : `?page=${currentPage - 1}${queryLink ? `&q=${queryLink}` : ''}`
  }`;
  const nextLink =
    currentPage + 1 === 1
      ? `${pathname}?page=${currentPage + 2}${
          queryLink ? `&q=${queryLink}` : ''
        }`
      : `${pathname}?page=${currentPage + 1}${
          queryLink ? `&q=${queryLink}` : ''
        }`;

  const pageNumbers = Array.from({ length: pageCount }).map((_, i) => i + 1);
  const firstPageNumbers = [1, 2];
  const lastPageNumbers = pageNumbers.slice(pageNumbers.length - 2);

  const showEllipse = (pageNum: number): boolean =>
    pageNum > 2 && pageNum < pageCount - 1;

  return (
    <div className="flex flex-row items-center justify-center bg-primaryBg dark:bg-primaryBgDark">
      <nav className="flex flex-row justify-between md:max-w-7xl md:px-0 px-6 pt-6 w-full text-lg">
        <NoScrollLink href={prevLink} passHref>
          <a
            className={`font-semibold ${
              !hasPrevLink ? disabledLinkStyles : enabledLinkStyles
            }`}
            aria-disabled={!hasPrevLink}
          >
            <span className="md:hidden">{'<'}</span>
            <span className="hidden md:block">&#8592; Previous Page</span>
          </a>
        </NoScrollLink>
        <div className="flex-row gap-2 hidden md:flex">
          {pageCount <= 5 ? (
            pageNumbers.map((num) => (
              <PageNumber
                key={num}
                pageNumber={num}
                routeBase={pathname}
                pageQueries={pageQueries}
              />
            ))
          ) : (
            <>
              {firstPageNumbers.map((num) => (
                <PageNumber
                  key={num}
                  pageNumber={num}
                  routeBase={pathname}
                  pageQueries={pageQueries}
                />
              ))}
              <span
                className={`text-sm font-semibold ${pageNumberStyles} ${
                  showEllipse(currentPage)
                    ? 'bg-accent dark:bg-accent/5'
                    : 'bg-primaryBgDark/10 dark:bg-primaryBgDark'
                }`}
                data-testid="pagination-ellipses"
              >
                ...
              </span>
              {lastPageNumbers.map((num) => (
                <PageNumber
                  key={num}
                  pageNumber={num}
                  routeBase={pathname}
                  pageQueries={pageQueries}
                />
              ))}
            </>
          )}
        </div>
        <p className="block md:hidden text-sm">
          Page{' '}
          <span className="font-semibold">
            {currentPage === 0 ? currentPage + 1 : currentPage}
          </span>{' '}
          of <span className="font-semibold">{pageCount}</span>
        </p>

        <NoScrollLink href={nextLink} passHref>
          <a
            className={`font-semibold ${
              !hasNextLink ? disabledLinkStyles : enabledLinkStyles
            }`}
            aria-disabled={!hasNextLink}
          >
            <span className="md:hidden">{'>'}</span>
            <span className="hidden md:block">Next Page &#8594;</span>
          </a>
        </NoScrollLink>
      </nav>
    </div>
  );
}
