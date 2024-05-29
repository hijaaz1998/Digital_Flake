import React from 'react';
import AddForm from './AddForm';
import { HiShoppingCart } from 'react-icons/hi';

const AddProduct = () => {
  const fields = [
    { id: 'productName', label: 'Product Name', type: 'text' },
    { id: 'subcategory', label: 'Subcategory', type: 'select', options: [{ value: '1', label: 'Option 1' }] },
    { id: 'category', label: 'Category', type: 'select', options: [{ value: '1', label: 'Option 1' }] },
    { id: 'status', label: 'Status', type: 'select', options: [{ value: '1', label: 'Option 1' }] },
    { id: 'image1', label: 'Image 1', type: 'file' },
  ];

  return <AddForm title="Add Product" fields={fields} icon={HiShoppingCart} />;
};

export default AddProduct;
