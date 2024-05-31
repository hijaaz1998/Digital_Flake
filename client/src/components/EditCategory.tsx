import React from 'react';
import EditForm from './EditForm';
import { HiViewGrid } from 'react-icons/hi';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../axiosEndPoint/axiosEndPoint';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const EditCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Use useParams to get the ID from the URL
  const userId = localStorage.getItem('userId');

  const fields = [
    { id: 'categoryName', label: 'Category Name', type: 'text', required: true },
    { id: 'status', label: 'Status', type: 'select', required: true, options: ['Active', 'Inactive'] },
    { id: 'image', label: 'Image', type: 'file', required: false },
  ];

  const fetchCategoryDetails = async (id) => {
    try {
      const response = await axiosInstance.get(`/category/${id}`, {
        params: { userId }
      });
      const category = response.data.category;
      console.log("catttt", category);

      return {
        categoryName: category.name,
        status: category.status ? 'Active' : 'Inactive',
        image: null,
      };
    } catch (error) {
      console.error('Error fetching category details:', error);
      return {};
    }
  };

  const handleImageUpload = async (image) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', import.meta.env.VITE_UPLOAD_PRESET);
    formData.append('cloud_name', import.meta.env.VITE_CLOUD_NAME);
    const response = await axios.post(import.meta.env.VITE_CLOUDINARY_URL, formData);
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
      const response = await axiosInstance.put(`/category/${id}`, formData);
      if (response.data.success) {
        toast.success('Category updated successfully!');
        navigate('/category');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update category');
    }
  };

  return (
    <EditForm
      title="Edit Category"
      fields={fields}
      icon={HiViewGrid}
      fetchItemDetails={fetchCategoryDetails}
      onSubmit={handleSubmit}
      id={id} // Pass the ID to the EditForm component
    />
  );
};

export default EditCategory;
