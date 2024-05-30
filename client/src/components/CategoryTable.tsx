import React, { useMemo, useState, useEffect } from 'react';
import { useTable, Column } from 'react-table';
import { Link } from 'react-router-dom';
import { FaRegEdit, FaRegTrashAlt, FaSearch, FaBox } from 'react-icons/fa';
import DeleteModal from './DeleteModal';
import axiosInstance from '../axiosEndPoint/axiosEndPoint';
import { toast } from 'react-hot-toast';

type User = {
  id: number;
  name: string;
  subcategory: string;
  category: string;
  image: string;
  status: string;
};

const CategoryTable: React.FC = () => {
  const [categories, setCategories] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axiosInstance.get('/category', {
          params: { userId } // Pass userId as a query parameter
        });
        
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Failed to fetch categories');
      }
    };
  
    fetchCategories();
  }, []);

  const data = useMemo(() => {
    if (!searchTerm) return categories;
    return categories.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, categories]);

  const columns: Column<User>[] = useMemo(() => [
    {
      Header: 'ID',
      accessor: '_id',
      Cell: ({ value }) => <span>{value.toString()}</span> // Convert _id to string
    },
    {
      Header: 'Category Name',
      accessor: 'name'
    },
    {
      Header: 'Image',
      accessor: 'image',
      Cell: ({ value }) => <img src={value} alt="Category" width="50" height="50" />
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ value }) => (
        <span className={value ? 'text-green-500' : 'text-red-500'}>{value ? 'Active' : 'Inactive'}</span>
      )
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <div className="flex space-x-2">
          <button
            className="text-gray-600 text-xl hover:text-gray-900"
            onClick={() => handleEdit(row.original)}
          >
            <FaRegEdit />
          </button>
          <button
            className="text-gray-600 text-xl hover:text-gray-900"
            onClick={() => handleDeleteClick(row.original)}
          >
            <FaRegTrashAlt />
          </button>
        </div>
      )
    }
  ], []);
  
  
  

  const handleEdit = (user: User) => {
    console.log('Edit', user);
  };

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (userToDelete) {
      console.log('Delete', userToDelete);
      setIsModalOpen(false);
      setUserToDelete(null);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setUserToDelete(null);
  };

  const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data });

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <FaBox className="text-xl text-gray-700" />
          <h1 className="text-2xl font-semibold text-gray-700">Categories</h1>
        </div>
        <div className="flex items-center space-x-2 flex-grow justify-center">
          <div className="relative w-full max-w-lg">
            <FaSearch className="absolute left-3 top-2.5 text-gray-500" />
            <input
              type="text"
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
              placeholder="Search..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Link to={'/add_category'}>
          <button className="px-4 py-2 bg-violet-800 text-white rounded-lg hover:bg-blue-700">
            Add New
          </button>
        </Link>
      </div>
      <div className="overflow-x-auto mb-1">
        <div className="max-h-[600px] overflow-y-auto"> {/* Set max-height as needed */}
          <table {...getTableProps()} className="min-w-full bg-white border border-gray-200 table-fixed">
            <thead className="bg-gray-50">
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()} className="border-b">
                  {headerGroup.headers.map(column => (
                    <th
                      {...column.getHeaderProps()}
                      className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider sticky top-0 bg-violet-800 z-10"
                    >
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {rows.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className="border-b">
                    {row.cells.map(cell => (
                      <td
                        {...cell.getCellProps()}
                        className="px-4 py-3 whitespace-nowrap font-normal text-sm text-black bg-gray-300"
                      >
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <DeleteModal isOpen={isModalOpen} onClose={handleModalClose} onConfirm={handleDeleteConfirm} />
    </div>
  );
};

export default CategoryTable;
