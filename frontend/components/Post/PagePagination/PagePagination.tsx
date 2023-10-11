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
  'flex items-center justify-center w-12 h-12 border-t-2 duration-300 ease-in-out transition-all';

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
      className={` ${pageNumberStyles} ${
        activePage
          ? ' border-t-brand'
          : 'border-t-transparent hover:border-text/25'
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
    <div className="flex flex-row items-center justify-center font-heading text-lg font-medium text-text/50">
      <nav className="grid grid-cols-6 border-t border-gray-200 px-4 sm:px-0 max-w-7xl w-full">
        <div className="flex flex-row">
          <Link
            href={`${routeBase}`}
            className={`border-t-transparent  ${pageNumberStyles} ${
              hasPrevLink ? ' hover:border-text/25' : ' line-through'
            }`}
            aria-disabled={!hasPrevLink}
          >
            <span>{'<<'}</span>
          </Link>
          <Link
            href={prevLink}
            className={`border-t-transparent  ${pageNumberStyles} ${
              hasPrevLink ? ' hover:border-text/25' : ' line-through'
            }`}
            aria-disabled={!hasPrevLink}
          >
            <span>{'<'}</span>
          </Link>
        </div>
        <div className="hidden flex-row md:flex col-span-4 justify-center">
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
                className={`font-medium  ${pageNumberStyles} ${
                  showEllipse(currentPage)
                    ? 'border-t-brand'
                    : 'border-t-transparent'
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
        <p className="block md:hidden col-span-4 place-self-center text-text/75">
          Page <span>{currentPage === 0 ? currentPage + 1 : currentPage}</span>{' '}
          of <span>{pageCount}</span>
        </p>

        <div className="col-start-6 flex flex-row justify-end">
          {hasNextLink ? (
            <>
              <Link
                href={nextLink}
                className={`border-t-transparent  ${pageNumberStyles} ${
                  hasNextLink ? ' hover:border-text/25' : ' line-through'
                }`}
                aria-disabled={!hasNextLink}
              >
                <span>{'>'}</span>
              </Link>
              <Link
                href={`${routeBase}/${pageCount}`}
                className={`border-t-transparent  ${pageNumberStyles} ${
                  hasNextLink ? ' hover:border-text/25' : ' line-through'
                }`}
                aria-disabled={!hasNextLink}
              >
                <span>{'>>'}</span>
              </Link>
            </>
          ) : null}
        </div>
      </nav>
    </div>
  );
}
