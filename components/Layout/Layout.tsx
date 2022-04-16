import React, { ReactNode } from 'react';
import Footer from '../Footer/Footer';
import DesktopHeader from '../Header/DesktopHeader/DesktopHeader';
import MobileHeader from '../Header/MobileHeader/MobileHeader';

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
