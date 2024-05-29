import React, { useMemo, useState } from 'react';
import { useTable, Column } from 'react-table';
import { FaRegEdit, FaRegTrashAlt, FaSearch, FaBox } from 'react-icons/fa';
import DeleteModal from './DeleteModal';

type User = {
  id: number;
  name: string;
  subcategory: string;
  category: string;
  image: string;
  status: string;
};

const users: User[] = [
  {
    id: 13464356,
    name: "Alice Smith",
    subcategory: "Subcategory A",
    category: "Category 1",
    image: "https://via.placeholder.com/150",
    status: "active"
  },
  {
    id: 2,
    name: "Bob Johnson",
    subcategory: "Subcategory B",
    category: "Category 2",
    image: "https://via.placeholder.com/150",
    status: "active"
  },
  // Add more users as needed
];

const ProductTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const data = useMemo(() => {
    if (!searchTerm) return users;
    return users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const columns: Column<User>[] = useMemo(() => [
    {
      Header: 'ID',
      accessor: 'id'
    },
    {
      Header: 'Name',
      accessor: 'name'
    },
    {
      Header: 'Subcategory',
      accessor: 'subcategory'
    },
    {
      Header: 'Category',
      accessor: 'category'
    },
    {
      Header: 'Image',
      accessor: 'image',
      Cell: ({ value }) => <img src={value} alt="User" width="50" height="50" />
    },
    {
      Header: 'Status',
      accessor: 'status'
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
          <h1 className="text-2xl font-semibold text-gray-700">Products</h1>
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
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
          Add Product
        </button>
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
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky top-0 bg-white z-10"
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
                        className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"
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

export default ProductTable;
