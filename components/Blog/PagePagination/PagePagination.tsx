import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface IProps {
  pageCount: number;
  currentPage: number;
}

interface PageNumberProps {
  pageNumber: number;
  routeBase: string;
  path: string;
  activePageNumber: number;
}

const disabledLinkStyles =
  'opacity-50 select-none pointer-events-none line-through';
const enabledLinkStyles = 'opacity-75';
const pageNumberStyles =
  'flex items-center justify-center rounded w-8 h-8 opacity-75';

function PageNumber({
  pageNumber,
  routeBase,
  path,
  activePageNumber,
}: PageNumberProps): JSX.Element {
  const activePage =
    path.includes(pageNumber.toString()) ||
    (Number.isNaN(activePageNumber) && pageNumber === 1);

  return (
    <Link
      href={`${
        pageNumber === 1 ? `${routeBase}` : `${routeBase}/${pageNumber}`
      }`}
      key={pageNumber}
      passHref
    >
      <a
        className={`text-sm font-semibold ${pageNumberStyles} ${
          activePage ? 'bg-accentBg' : 'bg-[rgba(17,24,39,10%)]'
        }`}
        data-testid="pagination-number"
      >
        {pageNumber}
      </a>
    </Link>
  );
}

export default function PagePagination({
  pageCount,
  currentPage,
}: IProps): JSX.Element {
  const { asPath } = useRouter();
  const lastURLRoute = asPath.split('/').at(-1);
  const activePageNumber = parseInt(lastURLRoute ?? '0');
  const routeBase = !Number.isNaN(activePageNumber)
    ? asPath.split('/').slice(0, -1).join('/')
    : asPath;

  const hasPrevLink = currentPage !== 0;
  const hasNextLink = pageCount > 2 && currentPage !== pageCount;

  const prevLink = `${routeBase}/${
    currentPage - 1 <= 1 ? '' : currentPage - 1
  }`;
  const nextLink =
    currentPage + 1 === 1
      ? `${routeBase}/${currentPage + 2}`
      : `${routeBase}/${currentPage + 1}`;

  const pageNumbers = Array.from({ length: pageCount }).map((_, i) => {
    return i + 1;
  });
  const firstPageNumbers = [1, 2];
  const lastPageNumbers = pageNumbers.slice(pageNumbers.length - 2);

  const showEllipse = (pageNum: number): boolean => {
    return pageNum > 2 && pageNum < pageCount - 1;
  };

  return (
    <div className="flex flex-row items-center justify-center">
      <nav className="flex flex-row justify-between max-w-[272px] md:max-w-[1372px] md:px-20 lg:px-106 px-3 pt-6 w-full text-lg">
        <Link href={prevLink} passHref>
          <a
            className={`font-semibold ${
              !hasPrevLink ? disabledLinkStyles : enabledLinkStyles
            }`}
            aria-disabled={!hasPrevLink}
          >
            <span className="md:hidden">{'<'}</span>
            <span className="hidden md:block">&#8592; Previous Page</span>
          </a>
        </Link>
        <div className="flex-row gap-2 hidden md:flex">
          {pageCount <= 5 ? (
            pageNumbers.map((page) => {
              return (
                <PageNumber
                  key={page}
                  pageNumber={page}
                  routeBase={routeBase}
                  path={asPath}
                  activePageNumber={activePageNumber}
                />
              );
            })
          ) : (
            <>
              {firstPageNumbers.map((page) => {
                return (
                  <PageNumber
                    key={page}
                    pageNumber={page}
                    routeBase={routeBase}
                    path={asPath}
                    activePageNumber={activePageNumber}
                  />
                );
              })}
              <span
                className={`text-sm font-semibold ${pageNumberStyles} ${
                  showEllipse(activePageNumber)
                    ? 'bg-accentBg'
                    : 'bg-[rgba(17,24,39,10%)]'
                }`}
                data-testid="pagination-ellipses"
              >
                ...
              </span>
              {lastPageNumbers.map((page) => {
                return (
                  <PageNumber
                    key={page}
                    pageNumber={page}
                    routeBase={routeBase}
                    path={asPath}
                    activePageNumber={activePageNumber}
                  />
                );
              })}
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

        <Link href={nextLink} passHref>
          <a
            className={`font-semibold ${
              !hasNextLink ? disabledLinkStyles : enabledLinkStyles
            }`}
            aria-disabled={!hasNextLink}
          >
            <span className="md:hidden">{'>'}</span>
            <span className="hidden md:block">Next Page &#8594;</span>
          </a>
        </Link>
      </nav>
    </div>
  );
}
