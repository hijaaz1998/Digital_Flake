import React from 'react';
import EditForm from './EditForm';
import { HiViewGrid } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosEndPoint/axiosEndPoint';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const EditProduct = () => {
  const navigate = useNavigate();

  const fields = [
    { id: 'name', label: 'Product Name', type: 'text', required: true },
    { id: 'category', label: 'Category', type: 'select', required: true },
    { id: 'status', label: 'Status', type: 'select', required: true, options: ['Active', 'Inactive'] },
    { id: 'image', label: 'Image', type: 'file', required: false },
  ];

  const fetchProductDetails = async (id) => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axiosInstance.get(`/product/${id}`, {
        params: { userId }
      });
      const product = response.data.product;
      console.log('singleproduct', product);
  
      return {
        name: product.name,
        category: product.category?._id || '',
        subcategory: product.subcategory?._id || '',
        image: null,
        status: product.status ? 'Active' : 'Inactive'
      };
    } catch (error) {
      console.error('Error fetching product details:', error);
      return {};
    }
  };

  const handleImageUpload = async (image) => {
    try {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', process.env.VITE_UPLOAD_PRESET);
      formData.append('cloud_name', process.env.VITE_CLOUD_NAME);
      const response = await axios.post(process.env.VITE_CLOUDINARY_URL, formData);
      return response.data.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const handleSubmit = async (formData, id) => {
    try {
      if (formData.image) {
        const imageUrl = await handleImageUpload(formData.image);
        formData.image = imageUrl;
      }

      formData.status = formData.status === 'Active';

      const response = await axiosInstance.put(`/product/${id}`, formData);
      if (response.data.success) {
        toast.success('Product updated successfully!');
        navigate('/products');
      } else {
        toast.error(response.data.message || 'Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
    }
  };

  return (
    <EditForm
      title="Edit Product"
      fields={fields}
      icon={HiViewGrid}
      fetchItemDetails={fetchProductDetails}
      onSubmit={handleSubmit}
      type="edit_product"
    />
  );
};

export default EditProduct;
