import React, { useMemo, useState, useEffect } from 'react';
import { useTable, Column } from 'react-table';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEdit, FaRegTrashAlt, FaSearch, FaBox } from 'react-icons/fa';
import DeleteModal from './DeleteModal';
import axiosInstance from '../axiosEndPoint/axiosEndPoint';
import { toast } from 'react-hot-toast';

type Category = {
  _id: string;
  name: string;
  image: string;
  status: boolean;
};

const CategoryTable: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

  const fetchCategories = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axiosInstance.get('/category', {
        params: { userId }
      });
      
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to fetch categories');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const data = useMemo(() => {
    if (!searchTerm) return categories;
    return categories.filter(category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, categories]);

  const columns: Column<Category>[] = useMemo(() => [
    {
      Header: 'ID',
      accessor: '_id',
      Cell: ({ value }) => <span>{value.toString()}</span>
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
            onClick={() => handleEdit(row.original._id)}
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

  const handleEdit = (categoryId: string) => {
    navigate(`/edit_category/${categoryId}`);
  };

  const handleDeleteClick = (category: Category) => {
    setCategoryToDelete(category);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (categoryToDelete) {
      try {
        const response = await axiosInstance.delete(`/category/${categoryToDelete._id}`)
        if(response.data.success){
          toast.success('Category deleted')
          setIsModalOpen(false);
          navigate('/category')
          fetchCategories();
        }
      } catch (error) {
        toast.error(error.message)
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCategoryToDelete(null);
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
        <div className="max-h-[600px] overflow-y-auto">
          {categories.length === 0 ? (
            <div className="text-center py-4 text-gray-600">
              No categories found.
            </div>
          ) : (
            <table {...getTableProps()} className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-50">
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()} className="border-b">
                    {headerGroup.headers.map(column => (
                      <th
                        {...column.getHeaderProps()}
                        className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider bg-violet-900 text-white sticky top-0"
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
                    <tr {...row.getRowProps()} className="border-b hover:bg-gray-100">
                      {row.cells.map(cell => (
                        <td
                          {...cell.getCellProps()}
                          className="px-4 py-3 whitespace-nowrap font-normal text-sm text-gray-900"
                        >
                          {cell.render('Cell')}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <DeleteModal title={'Are you sure you want to delete this item?'} isOpen={isModalOpen} onClose={handleModalClose} onConfirm={handleDeleteConfirm} />
    </div>
  );
};

export default CategoryTable;
