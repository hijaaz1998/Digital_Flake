import React from 'react';
import AddForm from './AddForm';
import { HiViewGrid } from 'react-icons/hi';

const AddSubcategory = () => {
  const fields = [
    { id: 'subcategoryName', label: 'Subcategory Name', type: 'text' },
    { id: 'category', label: 'Category', type: 'select', options: [{ value: '1', label: 'Option 1' }] },
    { id: 'status', label: 'Status', type: 'select', options: [{ value: '1', label: 'Option 1' }] },
    { id: 'image', label: 'Image', type: 'file' },
  ];

  return <AddForm title="Add Subcategory" fields={fields} icon={HiViewGrid} />;
};

export default AddSubcategory;
