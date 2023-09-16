'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import Link from 'next/link';

interface IProps {
  isMobile?: boolean;
}

interface CustomLinkProps {
  href: string;
  value: string;
  activeLink: boolean;
}

function CustomLink({ href, value, activeLink }: CustomLinkProps): JSX.Element {
  return (
    <li className="block w-max">
      <span className="font-heading text-lg font-extrabold opacity-75 hover:opacity-100 transition-all ease-in-out duration-150">
        <Link href={href}>{value}</Link>
      </span>
      <div className={activeLink ? 'border-b-4 border-brand' : ''} />
    </li>
  );
}

export default function NavBar({ isMobile = false }: IProps): JSX.Element {
  const pathname = usePathname();

  return (
    <nav aria-label="primary">
      <ul
        className={`flex gap-x-8 flex-wrap gap-y-4 justify-center ${
          isMobile ? 'flex-col' : 'flex-row'
        }`}
      >
        <CustomLink
          href="/"
          value="Home"
          activeLink={pathname === '/'}
          key="/"
        />
        <CustomLink
          href="/blog"
          value="Blog"
          activeLink={pathname?.includes('blog') || false}
          key="/blog"
        />
        <CustomLink
          href="/newsletter"
          value="Newsletter"
          activeLink={pathname?.includes('newsletter') || false}
          key="/newsletter"
        />
        <CustomLink
          href="/technical-writing"
          value="Technical Writing"
          activeLink={pathname?.includes('technical-writing') || false}
          key="/technical-writing"
        />
        <CustomLink
          href="/links"
          value="Links"
          activeLink={pathname?.includes('links') || false}
          key="/links"
        />
        <CustomLink
          href="/contact"
          value="Contact"
          activeLink={pathname?.includes('contact') || false}
          key="/contact"
        />
      </ul>
    </nav>
  );
}
