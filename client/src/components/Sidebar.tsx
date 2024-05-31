import React from 'react';
import { HiHome, HiViewGrid, HiTag, HiShoppingCart, HiChevronRight } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const getLinkClass = (paths: string[]) => {
    return paths.some(path => location.pathname.includes(path)) ? 'bg-violet-800 text-white' : 'bg-gray-300 text-black';
  };

  const getIconColorClass = (paths: string[]) => {
    return paths.some(path => location.pathname.includes(path)) ? 'text-white' : '';
  };

  return (
    <div className="w-2/12 h-full fixed left-0">
      <ul className="mt-10">
        <Link to="/home" className={`block ${getLinkClass(['/home'])}`}>
          <li className="flex items-center lg:justify-between justify-center py-4 px-4">
            <HiHome className="text-2xl" />
            <span className="ml-3 hidden lg:block">Home</span>
            <HiChevronRight className={`text-xl ml-auto hidden lg:block ${getIconColorClass(['/home'])}`} />
          </li>
        </Link>
        <Link to="/category" className={`block ${getLinkClass(['/category', '/edit_category', '/add_category'])}`}>
          <li className="flex items-center lg:justify-between justify-center py-4 px-4">
            <HiViewGrid className="text-2xl" />
            <span className="ml-3 hidden lg:block">Category</span>
            <HiChevronRight className={`text-xl ml-auto hidden lg:block ${getIconColorClass(['/category', '/edit_category', '/add_category'])}`} />
          </li>
        </Link>
        <Link to="/subcategory" className={`block ${getLinkClass(['/subcategory', '/edit_subcategory', '/add_subcategory'])}`}>
          <li className="flex items-center lg:justify-between justify-center py-4 px-4">
            <HiTag className="text-2xl" />
            <span className="ml-3 hidden lg:block">Subcategory</span>
            <HiChevronRight className={`text-xl ml-auto hidden lg:block ${getIconColorClass(['/subcategory', '/edit_subcategory', '/add_subcategory'])}`} />
          </li>
        </Link>
        <Link to="/products" className={`block ${getLinkClass(['/products', '/edit_product', '/add_product'])}`}>
          <li className="flex items-center lg:justify-between justify-center py-4 px-4">
            <HiShoppingCart className="text-2xl" />
            <span className="ml-3 hidden lg:block">Products</span>
            <HiChevronRight className={`text-xl ml-auto hidden lg:block ${getIconColorClass(['/products', '/edit_product', '/add_product'])}`} />
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
