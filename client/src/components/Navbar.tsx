import React from 'react';
import { HiOutlineUser } from 'react-icons/hi';
import { logout } from '../slices/userSlice';
import { UseDispatch, useDispatch } from 'react-redux';

const Navbar: React.FC = () => {

  const dispatch = useDispatch();
  
  return (
    <div className="w-full bg-violet-900 shadow-md p-4 flex items-center justify-between fixed top-0 h-20 left-0 z-10">
      <div className="flex items-center ml-10">
        <img src="/digitalFlake.png" alt="Logo" className="h-10" />
      </div>
      <div className="flex items-center mr-10 rounded-3xl" onClick={() => dispatch(logout())}>
        <HiOutlineUser className="text-white h-8 w-12" />
      </div>
    </div>
  );
};

export default Navbar;
