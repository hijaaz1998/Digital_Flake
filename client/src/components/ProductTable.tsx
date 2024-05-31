import React, { useMemo, useState, useEffect } from 'react';
import { useTable, Column } from 'react-table';
import { FaRegEdit, FaRegTrashAlt, FaSearch, FaBox } from 'react-icons/fa';
import DeleteModal from './DeleteModal';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosEndPoint/axiosEndPoint';

type Product = {
  id: string;  // Changed to string to match _id from the server
  name: string;
  subcategory: string;
  category: string;
  image: string;
  status: string;
};

const ProductTable: React.FC = () => {

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axiosInstance.get('/product', {
          params: { userId }
        });
        console.log('products', response.data.products);

        const cleanedProducts: Product[] = response.data.products.map((product: any) => ({
          id: product._id,
          name: product.name,
          subcategory: product.subcategory.name,
          category: product.category.name,
          image: product.image,
          status: product.status ? 'Active' : 'Inactive'
        }));
        setProducts(cleanedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const data = useMemo(() => {
    if (!searchTerm) return products;
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, products]);

  const columns: Column<Product>[] = useMemo(() => [
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
      Cell: ({ value }) => <img src={value} alt="Product" width="50" height="50" />
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
            onClick={() => handleEdit(row.original.id)}
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

  const handleEdit = (productId: string) => {
    console.log("productId",productId)
    navigate(`/edit_product/${productId}`); // Navigate to the edit form with subcategory ID
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (productToDelete) {
      console.log('Delete', productToDelete);
      setIsModalOpen(false);
      setProductToDelete(null);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setProductToDelete(null);
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
        <Link to={'/add_product'}>
          <button className="px-4 py-2 bg-violet-800 text-white rounded-lg hover:bg-blue-700">
            Add New
          </button>
        </Link>
      </div>
      <div className="overflow-x-auto mb-1">
        <div className="max-h-[600px] overflow-y-auto">
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

export default ProductTable;
