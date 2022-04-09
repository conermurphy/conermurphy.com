import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { POSTTYPES } from '../../../types';

interface IProps {
  pageCount: number;
  currentPage: number;
  postType: POSTTYPES;
}

const disabledLinkStyles =
  'opacity-50 select-none pointer-events-none line-through';
const enabledLinkStyles = 'opacity-75';
const pageNumberStyles =
  'flex items-center justify-center rounded w-8 h-8 opacity-75';

export default function PagePagination({
  pageCount,
  currentPage,
  postType,
}: IProps): JSX.Element {
  const { asPath } = useRouter();
  const activePageNumber = parseInt(asPath.split('/')[2]);

  const hasPrevLink = currentPage !== 0;
  const hasNextLink = currentPage !== pageCount;

  const prevLink = `${currentPage - 1 !== 1 ? currentPage - 1 : ''}`;
  const nextLink =
    currentPage + 1 === 1 ? `${currentPage + 2}` : `${currentPage + 1}`;

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
          {Array.from({ length: pageCount }).map((_, i) => {
            const pageNumber = i + 1;
            const lastPages = pageCount - 1;
            const activePage =
              asPath.includes(pageNumber.toString()) ||
              (asPath === `/${postType}` && pageNumber === 1);

            const showEllipse = (pageNum: number): boolean => {
              return pageNum > 2 && pageNum < lastPages;
            };

            if (pageCount > 5 && showEllipse(pageNumber)) {
              return (
                <span
                  className={`text-sm font-semibold ${pageNumberStyles} ${
                    showEllipse(activePageNumber) ? 'bg-accentBg' : ''
                  }`}
                >
                  ...
                </span>
              );
            }

            return (
              <Link
                href={`${
                  pageNumber === 1
                    ? `/${postType}`
                    : `/${postType}/${pageNumber}`
                }`}
                key={pageNumber}
                passHref
              >
                <a
                  className={`text-sm font-semibold ${pageNumberStyles} ${
                    activePage ? 'bg-accentBg' : 'bg-[rgba(17,24,39,10%)]'
                  }`}
                >
                  {pageNumber}
                </a>
              </Link>
            );
          })}
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
