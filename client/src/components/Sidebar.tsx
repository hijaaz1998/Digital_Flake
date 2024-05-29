import React from 'react';
import { HiHome, HiViewGrid, HiTag, HiShoppingCart, HiChevronRight } from 'react-icons/hi';

const Sidebar: React.FC = () => {
  return (
    <div className="bg-pink-300 w-2/12 h-full fixed left-0">
      <ul className="mt-10">
        <li className="flex items-center justify-between bg-lime-400 py-4 px-4">
          <div className="flex items-center">
            <HiHome className="mr-2 text-2xl" />
            <span className="ml-3">Home</span>
          </div>
          <HiChevronRight className="text-black text-xl" />
        </li>
        <li className="flex items-center justify-between py-4 px-4 bg-cyan-500">
          <div className="flex items-center">
            <HiViewGrid className="mr-2 text-2xl" />
            <span className="ml-3">Category</span>
          </div>
          <HiChevronRight className="text-black text-xl" />
        </li>
        <li className="flex items-center justify-between py-4 px-4 bg-green-400">
          <div className="flex items-center">
            <HiTag className="mr-2 text-2xl" />
            <span className="ml-3">Subcategory</span>
          </div>
          <HiChevronRight className="text-black text-xl" />
        </li>
        <li className="flex items-center justify-between py-4 px-4 bg-violet-400">
          <div className="flex items-center">
            <HiShoppingCart className="mr-2 text-2xl" />
            <span className="ml-3">Products</span>
          </div>
          <HiChevronRight className="text-black text-xl" />
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
