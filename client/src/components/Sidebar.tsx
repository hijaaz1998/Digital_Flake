import React from 'react';
import { HiHome, HiViewGrid, HiTag, HiShoppingCart, HiChevronRight } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const getLinkClass = (path: string) => {
    return location.pathname.includes(path) ? 'bg-violet-800 text-white' : 'bg-gray-300 text-black';
  };

  const getIconColorClass = (path: string) => {
    return location.pathname.includes(path) ? 'text-white' : '';
  };

  return (
    <div className="w-2/12 h-full fixed left-0">
      <ul className="mt-10">
        <Link to="/home" className={`block ${getLinkClass('/home')}`}>
          <li className="flex items-center justify-between py-4 px-4">
            <HiHome className="mr-2 text-2xl" />
            <span className="ml-3">Home</span>
            <HiChevronRight className={`text-xl ml-auto ${getIconColorClass('/home')}`} />
          </li>
        </Link>
        <Link to="/category" className={`block ${getLinkClass('/category')}`}>
          <li className="flex items-center justify-between py-4 px-4">
            <HiViewGrid className="mr-2 text-2xl" />
            <span className="ml-3">Category</span>
            <HiChevronRight className={`text-xl ml-auto ${getIconColorClass('/category')}`} />
          </li>
        </Link>
        <Link to="/subcategory" className={`block ${getLinkClass('/subcategory')}`}>
          <li className="flex items-center justify-between py-4 px-4">
            <HiTag className="mr-2 text-2xl" />
            <span className="ml-3">Subcategory</span>
            <HiChevronRight className={`text-xl ml-auto ${getIconColorClass('/subcategory')}`} />
          </li>
        </Link>
        <Link to="/products" className={`block ${getLinkClass('/products')}`}>
          <li className="flex items-center justify-between py-4 px-4">
            <HiShoppingCart className="mr-2 text-2xl" />
            <span className="ml-3">Products</span>
            <HiChevronRight className={`text-xl ml-auto ${getIconColorClass('/products')}`} />
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
