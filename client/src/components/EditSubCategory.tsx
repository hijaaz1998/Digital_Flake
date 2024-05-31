import React from 'react';
import EditForm from './EditForm';
import { HiViewGrid } from 'react-icons/hi';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../axiosEndPoint/axiosEndPoint';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const EditSubcategory = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Use useParams to get the ID from the URL

  const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;
  const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
  const UPLOAD_URL = import.meta.env.VITE_CLOUDINARY_URL;
  const userId = localStorage.getItem('userId');

  const fields = [
    { id: 'subcategoryName', label: 'Subcategory Name', type: 'text', required: true },
    { id: 'category', label: 'Category', type: 'select', required: true },
    { id: 'status', label: 'Status', type: 'select', required: true, options: ['Active', 'Inactive'] },
    { id: 'image', label: 'Image', type: 'file', required: false },
  ];

  const fetchSubcategoryDetails = async (id) => {
    try {
      const response = await axiosInstance.get(`/sub_category/${id}`, {
        params: { userId }
      });
      const subcategory = response.data.subCategories;
      console.log('subcateg', subcategory);
      return {
        subcategoryName: subcategory.name,
        category: subcategory.category._id,
        status: subcategory.status ? 'Active' : 'Inactive',
        image: null,
      };
    } catch (error) {
      console.error('Error fetching subcategory details:', error);
      return {};
    }
  };

  const handleImageUpload = async (image) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('cloud_name', CLOUD_NAME);
    const response = await axios.post(UPLOAD_URL, formData);
    return response.data.secure_url;
  };

  const handleSubmit = async (formData, id) => {
    if (formData.image) {
      const imageUrl = await handleImageUpload(formData.image);
      formData.image = imageUrl;
    } else {
      delete formData.image; // Remove image field if not provided
    }

    formData.status = formData.status === 'Active';

    try {
      const response = await axiosInstance.put(`/sub_category/${id}`, formData);
      if (response.data.success) {
        toast.success('Subcategory updated successfully!');
        navigate('/subcategory');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update subcategory');
    }
  };

  return (
    <EditForm
      title="Edit Subcategory"
      fields={fields}
      icon={HiViewGrid}
      fetchItemDetails={fetchSubcategoryDetails}
      onSubmit={handleSubmit}
      id={id} // Pass the ID to the EditForm component
    />
  );
};

export default EditSubcategory;
