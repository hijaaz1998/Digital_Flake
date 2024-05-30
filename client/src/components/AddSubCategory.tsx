import React, { useState, useEffect } from 'react';
import AddForm from './AddForm';
import { HiViewGrid } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../axiosEndPoint/axiosEndPoint';
import { toast } from 'react-hot-toast';

const AddSubcategory = () => {

  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const userId = localStorage.getItem('userId');

  const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;
  const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
  const UPLOAD_URL = import.meta.env.VITE_CLOUDINARY_URL;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/category', {
          params: { userId },
        });
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Failed to fetch categories');
      }
    };

    fetchCategories();
  }, [userId]);

  const fields = [
    { id: 'subcategoryName', label: 'Subcategory Name', type: 'text' },
    { id: 'category', label: 'Category', type: 'select', options: [{ value: '', label: 'Select Category' }, ...categories.map(cat => ({ value: cat._id, label: cat.name }))] },
    { id: 'image', label: 'Image', type: 'file' },
  ];

  const handleImageUpload = async (image: string) => {
    try {
      const formData = new FormData();
      if (image) {
        formData.append('file', image);
        formData.append('upload_preset', UPLOAD_PRESET);
        formData.append('cloud_name', CLOUD_NAME);

        const response = await axios.post(UPLOAD_URL, formData);
        console.log('image', response.data.secure_url);
        return response.data.secure_url;
      }
    } catch (error) {
      console.error(error);
      toast.error('Image upload failed');
    }
  };

  const handleSubmit = async (formData) => {
    if (formData.image) {
      const imageUrl = await handleImageUpload(formData.image);
      formData.image = imageUrl;
    }

    formData.userId = userId;

    console.log('Subcategory form submitted with data:', formData);

    try {
      const response = await axiosInstance.post('/sub_category', formData);
      if (response.data.success) {
        toast.success('Subcategory added successfully!');
        navigate('/subcategory')
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        console.error('Error adding subcategory:', error);
        toast.error('Failed to add subcategory');
      }
    }
  };

  return <AddForm title="Add Subcategory" fields={fields} icon={HiViewGrid} onSubmit={handleSubmit} />;
};

export default AddSubcategory;
