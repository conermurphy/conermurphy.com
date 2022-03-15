import React, { ReactNode } from 'react';
import Header from '../Header/Header';

interface IProps {
  children?: ReactNode;
}

export default function Layout({ children }: IProps): JSX.Element {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
