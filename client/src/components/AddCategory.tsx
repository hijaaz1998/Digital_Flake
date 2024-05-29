import React from 'react';
import AddForm from './AddForm';
import { HiTag } from 'react-icons/hi';

const AddCategory = () => {
  const fields = [
    { id: 'categoryName', label: 'Category Name', type: 'text' },
    { id: 'status', label: 'Status', type: 'select', options: [{ value: '1', label: 'Option 1' }] },
    { id: 'image', label: 'Image', type: 'file' },
  ];

  return <AddForm title="Add Category" fields={fields} icon={HiTag} />;
};

export default AddCategory;
