import React, { useState } from 'react';
import { HiOutlineUser } from 'react-icons/hi';
import { logout } from '../redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="relative w-full bg-violet-900 shadow-md p-4 flex items-center justify-between fixed top-0 h-20 z-70">
      <div className="flex items-center ml-10">
        <img src="/digitalFlake.png" alt="Logo" className="h-10" />
      </div>
      <div className="relative">
        <div className="flex items-center mr-10 rounded-3xl cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
          <HiOutlineUser className="text-white h-8 w-12" />
        </div>
        {showDropdown && (
          <div className="absolute top-full right-0 mt-2 bg-white shadow-md rounded-lg">
            <button className="block w-full px-4 py-2 text-gray-800 text-left hover:bg-gray-200 hover:text-gray-900" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
