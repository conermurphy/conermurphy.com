import React, { ReactNode } from 'react';
import Link from 'next/link';

interface IProps {
  href: string;
  children: ReactNode;
  [x: string]: string | boolean | ReactNode;
}

export default function NoScrollLink({
  href,
  children,
  ...props
}: IProps): JSX.Element {
  return (
    <Link href={href} scroll={false} {...props}>
      {children}
    </Link>
  );
}
