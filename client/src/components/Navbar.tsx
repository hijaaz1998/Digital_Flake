import React from 'react';
import { HiOutlineUser } from 'react-icons/hi';

const Navbar: React.FC = () => {
  return (
    <div className="w-full bg-white shadow-md p-4 flex items-center justify-between fixed top-0 h-20 left-0 z-10">
      <div className="flex items-center ml-10">
        <img src="/digitalFlake.png" alt="Logo" className="h-10" />
      </div>
      <div className="flex items-center mr-10">
        <HiOutlineUser className="text-gray-600 h-8 w-12" />
      </div>
    </div>
  );
};

export default Navbar;
