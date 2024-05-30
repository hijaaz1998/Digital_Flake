import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const HomePage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className='h-screen overflow-hidden flex flex-col'>
      <div className=' h-20 w-full fixed top-0 left-0'>
        <Navbar />
      </div>
      <div className=' flex flex-1 pt-20'>
        <div className='w-2/12 h-screen fixed top-20 left-0 bg-gray-200'>
          <Sidebar />
        </div>
        <div className='flex-1 overflow-auto' style={{ marginLeft: '16.67%' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
