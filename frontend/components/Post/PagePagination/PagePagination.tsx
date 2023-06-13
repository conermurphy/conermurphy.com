import { useRouter } from 'next/router';
import React from 'react';
import Link from 'next/link';

interface IProps {
  pageCount: number;
  currentPage: number;
}

interface PageNumberProps {
  pageNumber: number;
  routeBase: string;
  activePageNumber: number;
  path: string;
}

const pageNumberStyles =
  'flex items-center justify-center w-12 h-12 border-b-4 duration-300 ease-in-out transition-all';

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
      className={`text-base font-extrabold text-text/50 ${pageNumberStyles} ${
        activePage
          ? ' border-b-brand'
          : ' border-b-text/10 hover:border-b-brand'
      }`}
    >
      {pageNumber}
    </Link>
  );
}

export default function PagePagination({
  pageCount,
  currentPage,
}: IProps): JSX.Element {
  const { asPath, pathname } = useRouter();

  const lastURLRoute = asPath.split('/')[asPath.split('/').length - 1];
  const activePageNumber = parseInt(lastURLRoute ?? '0');
  const routeBase = !Number.isNaN(activePageNumber)
    ? asPath.split('/').slice(0, -1).join('/')
    : asPath;

  const hasPrevLink = currentPage !== 0;
  const hasNextLink = pageCount >= 2 && currentPage !== pageCount;

  const prevLink = `${routeBase}/${
    currentPage - 1 <= 1 ? '' : currentPage - 1
  }`;
  const nextLink =
    currentPage + 1 === 1
      ? `${routeBase}/${currentPage + 2}`
      : `${routeBase}/${currentPage + 1}`;

  const pageNumbers = Array.from({ length: pageCount }).map((_, i) => i + 1);
  const firstPageNumbers = [1, 2];
  const lastPageNumbers = pageNumbers.slice(pageNumbers.length - 2);

  const showEllipse = (pageNum: number): boolean =>
    pageNum > 2 && pageNum < pageCount - 1;

  return (
    <div className="flex flex-row items-center justify-center">
      <nav className="flex flex-row items-center justify-center md:max-w-7xl px-6 pt-6 w-full text-sm md:text-lg lg:px-12 2xl:px-0 gap-6 md:gap-24">
        <div className="flex flex-row">
          <Link
            href={`${routeBase}`}
            className={`text-base font-extrabold text-text/50 ${pageNumberStyles} ${
              hasPrevLink
                ? 'border-b-text/10 hover:border-b-brand'
                : 'border-b-text/10 text-text/10 line-through'
            }`}
            aria-disabled={!hasPrevLink}
          >
            <span>{'<<'}</span>
          </Link>
          <Link
            href={prevLink}
            className={`text-base font-extrabold text-text/50 ${pageNumberStyles} ${
              hasPrevLink
                ? 'border-b-text/10 hover:border-b-brand'
                : 'border-b-text/10 text-text/10 line-through'
            }`}
            aria-disabled={!hasPrevLink}
          >
            <span>{'<'}</span>
          </Link>
        </div>
        <div className="hidden flex-row md:flex">
          {pageCount <= 5 ? (
            pageNumbers.map((num) => (
              <PageNumber
                key={num}
                pageNumber={num}
                routeBase={pathname}
                path={asPath}
                activePageNumber={activePageNumber}
              />
            ))
          ) : (
            <>
              {firstPageNumbers.map((num) => (
                <PageNumber
                  key={num}
                  pageNumber={num}
                  routeBase={pathname}
                  path={asPath}
                  activePageNumber={activePageNumber}
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
                  path={asPath}
                  activePageNumber={activePageNumber}
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
          <Link
            href={nextLink}
            className={`text-base font-extrabold text-text/50 ${pageNumberStyles} ${
              hasNextLink
                ? 'border-b-text/10 hover:border-b-brand'
                : 'border-b-text/10 text-text/10 line-through'
            }`}
            aria-disabled={!hasNextLink}
          >
            <span>{'>'}</span>
          </Link>
          <Link
            href={`${routeBase}/${pageCount}`}
            className={`text-base font-extrabold text-text/50 ${pageNumberStyles} ${
              hasNextLink
                ? 'border-b-text/10 hover:border-b-brand'
                : 'border-b-text/10 text-text/10 line-through'
            }`}
            aria-disabled={!hasNextLink}
          >
            <span>{'>>'}</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
