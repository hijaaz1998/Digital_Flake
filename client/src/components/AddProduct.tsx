import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { HiShoppingCart } from 'react-icons/hi';
import AddForm from './AddForm';
import { toast } from 'react-hot-toast';
import axiosInstance from '../axiosEndPoint/axiosEndPoint';

const AddProduct = () => {
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');

  const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;
  const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
  const UPLOAD_URL = import.meta.env.VITE_CLOUDINARY_URL;

  const fields = [
    { id: 'productName', label: 'Product Name', type: 'text' },
    { id: 'category', label: 'Category', type: 'select' },
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
      console.log("formdata",formData)
      const response = await axiosInstance.post('/product', formData);
      if (response.data.success) {
        toast.success("Product added successfully!");
        navigate('/products');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to add product");
      }
    }
  };

  return <AddForm title="Add Product" fields={fields} icon={HiShoppingCart} onSubmit={handleSubmit} />;
};

export default AddProduct;
