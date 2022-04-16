import React from 'react';
import NavBar from '../../../../NavBar/NavBar';
import Newsletter from '../../../../Newsletter/Newsleter';

interface IProps {
  isOpen: boolean;
}

export default function MobileNavMenu({ isOpen }: IProps): JSX.Element | null {
  return isOpen ? (
    <div className="fixed top-16 w-full border-b border-primaryBorder">
      <div className="p-6 bg-secondaryBg">
        <NavBar isMobile />
      </div>
      <div className="p-6 bg-primaryBg">
        <Newsletter />
      </div>
    </div>
  ) : null;
}
