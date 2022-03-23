import React from 'react';
import Link from 'next/link';

interface CustomLinkProps {
  href: string;
  value: string;
}

function CustomLink({ href, value }: CustomLinkProps): JSX.Element {
  return (
    <Link href={href} passHref>
      <a className="font-semibold">{value}</a>
    </Link>
  );
}

export default function NavBar(): JSX.Element {
  return (
    <nav className="flex flex-row gap-8">
      <CustomLink href="/" value="Home" />
      <CustomLink href="/blog" value="Blog" />
      <CustomLink href="/contact" value="Contact" />
    </nav>
  );
}
