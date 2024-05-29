import React from 'react';
import EditingForm from './EditForm';
import { HiViewGrid } from 'react-icons/hi';

const EditSubcategory = () => {
  const fields = [
    { id: 'subcategoryName', label: 'Subcategory Name', type: 'text' },
    { id: 'category', label: 'Category', type: 'select', options: [{ value: '1', label: 'Option 1' }] },
    { id: 'status', label: 'Status', type: 'select', options: [{ value: '1', label: 'Option 1' }] },
    { id: 'image', label: 'Image', type: 'file' },
  ];

  return <EditingForm title="Edit Subcategory" fields={fields} icon={HiViewGrid} />;
};

export default EditSubcategory;
