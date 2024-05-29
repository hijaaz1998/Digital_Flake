import React from 'react';
import EditingForm from './EditForm';
import { HiShoppingCart } from 'react-icons/hi';

const EditProduct = () => {
  const fields = [
    { id: 'productName', label: 'Product Name', type: 'text' },
    { id: 'subcategory', label: 'Subcategory', type: 'select', options: [{ value: '1', label: 'Option 1' }] },
    { id: 'category', label: 'Category', type: 'select', options: [{ value: '1', label: 'Option 1' }] },
    { id: 'status', label: 'Status', type: 'select', options: [{ value: '1', label: 'Option 1' }] },
    { id: 'image1', label: 'Image 1', type: 'file' },
  ];

  return <EditingForm title="Edit Product" fields={fields} icon={HiShoppingCart} />;
};

export default EditProduct;
