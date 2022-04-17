import React, { ReactNode } from 'react';
import Footer from '../Footer/Footer';
import { DesktopHeader, MobileHeader } from '../Header';

interface IProps {
  children?: ReactNode;
}

export default function Layout({ children }: IProps): JSX.Element {
  return (
    <>
      <DesktopHeader />
      <MobileHeader />
      <main>{children}</main>
      <Footer />
    </>
  );
}
