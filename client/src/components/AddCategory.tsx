import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { HiTag } from 'react-icons/hi';
import AddForm from './AddForm';
import { toast } from 'react-hot-toast';
import axiosInstance from '../axiosEndPoint/axiosEndPoint';

const AddCategory = () => {
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');

  const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;
  const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
  const UPLOAD_URL = import.meta.env.VITE_CLOUDINARY_URL;

  const fields = [
    { id: 'categoryName', label: 'Category Name', type: 'text' },
    { id: 'image', label: 'Image', type: 'file' },
  ];

  const handleImageUpload = async (image) => {
    try {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', UPLOAD_PRESET);
      formData.append('cloud_name', CLOUD_NAME);

      const response = await axios.post(UPLOAD_URL, formData);
      return response.data.secure_url;
    } catch (error) {
      toast.error("Image upload failed");
      throw error;
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (formData.image) {
        const imageUrl = await handleImageUpload(formData.image);
        formData.image = imageUrl;
      }
      formData.userId = userId;

      const response = await axiosInstance.post('/category', formData);
      if (response.data.success) {
        toast.success("Category added successfully!");
        navigate('/category');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to add category");
      }
    }
  };

  return <AddForm title="Add Category" fields={fields} icon={HiTag} onSubmit={handleSubmit} />;
};

export default AddCategory;
