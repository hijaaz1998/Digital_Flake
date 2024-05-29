import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ProductTable from '../components/ProductTable';
import CategoryTable from '../components/CategoryTable';
import SubcategoryTable from '../components/SubCategoryTable';
import Dashboard from '../components/Dashboard';
import AddProduct from '../components/AddProduct'
import EditCategory from '../components/EditCategory';
import EditSubcategory from '../components/EditSubCategory';
import EditProduct from '../components/EditProduct';
import AddCategory from '../components/AddCategory';
import AddSubcategory from '../components/AddSubCategory';

const HomePage: React.FC = () => {
  return (
    <div className='h-screen bg-violet-300 overflow-hidden flex flex-col'>
      <div className='bg-yellow-300 h-20 w-full fixed top-0 left-0'>
        <Navbar />
      </div>
      <div className='flex flex-1 pt-20'>
        <div className='w-2/12 bg-indigo-300 h-screen fixed top-20 left-0'>
          <Sidebar/>
        </div>
        <div className='bg-red-300 flex-1 overflow-auto' style={{ marginLeft: '16.67%' }}>
          <ProductTable />
          {/* <CategoryTable /> */}
          {/* <SubcategoryTable /> */}
          {/* <Dashboard /> */}
          {/* <AddProduct /> */}
          {/* <AddCategory /> */}
          {/* <AddSubcategory /> */}
          {/* <EditCategory /> */}
          {/* <EditSubcategory /> */}
          {/* <EditProduct /> */}
        </div>
      </div>
    </div>
  );
}

export default HomePage;

















