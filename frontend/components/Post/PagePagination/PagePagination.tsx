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

const pageNumberStyles =
  'flex items-center justify-center w-12 h-12 border-b-4 duration-300 ease-in-out transition-all';

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
      className={`text-base font-extrabold text-text/50 ${pageNumberStyles} ${
        activePage
          ? ' border-b-brand'
          : ' border-b-text/10 hover:border-b-brand'
      }`}
    >
      {pageNumber}
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
    <div className="flex flex-row items-center justify-center">
      <nav className="flex flex-row justify-center md:max-w-7xl px-6 pt-6 w-full text-lg lg:px-12 2xl:px-0 gap-24">
        <div className="flex flex-row">
          <NoScrollLink
            href={`${pathname}${queryLink ? `?q=${queryLink}` : ''}`}
            className={`text-base font-extrabold text-text/50 ${pageNumberStyles} ${
              hasPrevLink
                ? 'border-b-text/10 hover:border-b-brand'
                : 'border-b-text/10 text-text/10 line-through'
            }`}
            aria-disabled={!hasPrevLink}
          >
            <span>{'<<'}</span>
          </NoScrollLink>
          <NoScrollLink
            href={prevLink}
            className={`text-base font-extrabold text-text/50 ${pageNumberStyles} ${
              hasPrevLink
                ? 'border-b-text/10 hover:border-b-brand'
                : 'border-b-text/10 text-text/10 line-through'
            }`}
            aria-disabled={!hasPrevLink}
          >
            <span>{'<'}</span>
          </NoScrollLink>
        </div>
        <div className="flex flex-row md:flex">
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
                className={`text-base font-extrabold text-text/50 ${pageNumberStyles} ${
                  showEllipse(currentPage)
                    ? 'border-b-brand'
                    : 'border-b-text/10'
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

        <div className="flex flex-row">
          <NoScrollLink
            href={nextLink}
            className={`text-base font-extrabold text-text/50 ${pageNumberStyles} ${
              hasNextLink
                ? 'border-b-text/10 hover:border-b-brand'
                : 'border-b-text/10 text-text/10 line-through'
            }`}
            aria-disabled={!hasNextLink}
          >
            <span>{'>'}</span>
          </NoScrollLink>
          <NoScrollLink
            href={`${pathname}?page=${pageNumbers.length}${
              queryLink ? `&q=${queryLink}` : ''
            }`}
            className={`text-base font-extrabold text-text/50 ${pageNumberStyles} ${
              hasNextLink
                ? 'border-b-text/10 hover:border-b-brand'
                : 'border-b-text/10 text-text/10 line-through'
            }`}
            aria-disabled={!hasNextLink}
          >
            <span>{'>>'}</span>
          </NoScrollLink>
        </div>
      </nav>
    </div>
  );
}
