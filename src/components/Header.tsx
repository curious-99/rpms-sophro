import React from 'react';
import DarkModeToggle from './DarkModeToggle';
import SophroSyneLogo from '../assets/logo/sophrosyne-logo.svg';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 p-4 flex justify-between items-center bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
      <img
        src={SophroSyneLogo}
        alt="Sophrosyne logo"
        className="h-20 w-20 hover:opacity-80 transition-opacity cursor-pointer"
      />
      <DarkModeToggle />
    </header>
  );
};

export default Header;
