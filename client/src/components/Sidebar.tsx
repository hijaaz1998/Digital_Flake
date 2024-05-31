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
          <li className="flex items-center lg:justify-between justify-center py-4 px-4">
            <HiHome className="text-2xl" />
            <span className="ml-3 hidden lg:block">Home</span>
            <HiChevronRight className={`text-xl ml-auto hidden lg:block ${getIconColorClass('/home')}`} />
          </li>
        </Link>
        <Link to="/category" className={`block ${getLinkClass('/category')}`}>
          <li className="flex items-center lg:justify-between justify-center py-4 px-4">
            <HiViewGrid className="text-2xl" />
            <span className="ml-3 hidden lg:block">Category</span>
            <HiChevronRight className={`text-xl ml-auto hidden lg:block ${getIconColorClass('/category')}`} />
          </li>
        </Link>
        <Link to="/subcategory" className={`block ${getLinkClass('/subcategory')}`}>
          <li className="flex items-center lg:justify-between justify-center py-4 px-4">
            <HiTag className="text-2xl" />
            <span className="ml-3 hidden lg:block">Subcategory</span>
            <HiChevronRight className={`text-xl ml-auto hidden lg:block ${getIconColorClass('/subcategory')}`} />
          </li>
        </Link>
        <Link to="/products" className={`block ${getLinkClass('/products')}`}>
          <li className="flex items-center lg:justify-between justify-center py-4 px-4">
            <HiShoppingCart className="text-2xl" />
            <span className="ml-3 hidden lg:block">Products</span>
            <HiChevronRight className={`text-xl ml-auto hidden lg:block ${getIconColorClass('/products')}`} />
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
