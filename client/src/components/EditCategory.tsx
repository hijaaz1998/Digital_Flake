import React from 'react';
import EditingForm from './EditForm';
import { HiTag } from 'react-icons/hi';

const EditCategory = () => {
  const fields = [
    { id: 'categoryName', label: 'Category Name', type: 'text' },
    { id: 'status', label: 'Status', type: 'select', options: [{ value: '1', label: 'Option 1' }] },
    { id: 'image', label: 'Image', type: 'file' },
  ];

  return <EditingForm title="Edit Category" fields={fields} icon={HiTag} />;
};

export default EditCategory;
