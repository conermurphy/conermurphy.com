import { useRouter } from 'next/router';
import React from 'react';
import NoScrollLink from '../NoScrollLink/NoScrollLink';

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
    <div className="block w-max">
      <NoScrollLink href={href} passHref>
        <a className="font-semibold opacity-75">{value}</a>
      </NoScrollLink>
      <div className={activeLink ? 'border-b-2' : ''} />
    </div>
  );
}

export default function NavBar({ isMobile = false }: IProps): JSX.Element {
  const { asPath } = useRouter();

  return (
    <nav
      className={`flex gap-x-8 gap-y-4 ${isMobile ? 'flex-col' : 'flex-row'}`}
    >
      <CustomLink href="/" value="Home" activeLink={asPath === '/'} key="/" />
      <CustomLink
        href="/blog"
        value="Blog"
        activeLink={asPath.includes('blog')}
        key="/blog"
      />
      <CustomLink
        href="/newsletter"
        value="Newsletter"
        activeLink={asPath.includes('newsletter')}
        key="/newsletter"
      />
      <CustomLink
        href="/contact"
        value="Contact"
        activeLink={asPath.includes('contact')}
        key="/contact"
      />
    </nav>
  );
}
