import React from 'react';
import Link from 'next/link';

interface IProps {
  isMobile?: boolean;
}

interface CustomLinkProps {
  href: string;
  value: string;
}

function CustomLink({ href, value }: CustomLinkProps): JSX.Element {
  return (
    <Link href={href} passHref>
      <a className="font-semibold opacity-75">{value}</a>
    </Link>
  );
}

export default function NavBar({ isMobile = false }: IProps): JSX.Element {
  return (
    <nav
      className={`flex gap-x-8 gap-y-4 ${isMobile ? 'flex-col' : 'flex-row'}`}
    >
      <CustomLink href="/" value="Home" />
      <CustomLink href="/blog" value="Blog" />
      <CustomLink href="/newsletter" value="Newsletter" />
      <CustomLink href="/contact" value="Contact" />
    </nav>
  );
}
