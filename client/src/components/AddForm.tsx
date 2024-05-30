import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axiosInstance from '../axiosEndPoint/axiosEndPoint';

const AddForm = ({ title, fields, icon, onSubmit }) => {
  const IconComponent = icon;
  const location = useLocation();

  const [formData, setFormData] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    if (location.pathname === '/add_product' || location.pathname === '/add_subcategory') {
      fetchCategories();
    }
  }, [location.pathname]);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get('/categories');
      setCategories(response.data.categories.map(category => ({
        label: category.name,
        value: category._id,
        subcategories: category.subcategories.map(subcategory => ({
          label: subcategory.name,
          value: subcategory._id
        }))
      })));
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleInputChange = (e) => {
    const { id, value, files } = e.target;
    if (id === 'category') {
      setSelectedCategory(value);
      setFormData({ ...formData, [id]: value, subcategory: '' });
    } else if (id === 'image') {
      setFormData({ ...formData, [id]: files[0] });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const validateForm = () => {
    const newErrors = [];
    fields.forEach(field => {
      if (!formData[field.id]) {
        newErrors.push(`${field.label} is required`);
      }
    });
    if (location.pathname === '/add_product' && selectedCategory && !formData.subcategory) {
      newErrors.push('Subcategory is required');
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (errors.length > 0) {
      toast.error(errors[0]);
    } else {
      onSubmit(formData);
    }
  };

  const renderSelectOptions = () => {
    if (location.pathname === '/add_product') {
      return categories
        .filter(category => category.subcategories.length > 0)
        .map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ));
    } else {
      return categories.map((category) => (
        <option key={category.value} value={category.value}>
          {category.label}
        </option>
      ));
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center mb-6">
        <IconComponent className="mr-2 text-2xl" />
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {fields.map((field) => (
            <div key={field.id}>
              <label htmlFor={field.id} className="block mb-1">
                {field.label}
              </label>
              {field.type === 'select' && field.id !== 'subcategory' ? (
                <select
                  id={field.id}
                  className="w-full border rounded px-3 py-2"
                  onChange={handleInputChange}
                  value={selectedCategory}
                >
                  <option value="">Select {field.label}</option>
                  {renderSelectOptions()}
                </select>
              ) : (
                <input
                  type={field.type}
                  id={field.id}
                  className="w-full border rounded px-3 py-2"
                  onChange={handleInputChange}
                />
              )}
            </div>
          ))}
        </div>
        {location.pathname === '/add_product' && selectedCategory && (
          <div className="mt-4">
            <label htmlFor="subcategory" className="block mb-1">Subcategory</label>
            <select
              id="subcategory"
              className="w-full border rounded px-3 py-2"
              onChange={handleInputChange}
              value={formData.subcategory || ''}
            >
              <option value="">Select Subcategory</option>
              {categories.find(category => category.value === selectedCategory).subcategories.map((subcategory) => (
                <option key={subcategory.value} value={subcategory.value}>
                  {subcategory.label}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="mt-8 flex justify-end">
          <button type="button" className="mr-6 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddForm;
