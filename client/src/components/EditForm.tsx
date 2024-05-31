import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axiosInstance from '../axiosEndPoint/axiosEndPoint';

const EditForm = ({ title, fields, icon, fetchItemDetails, onSubmit, type, categoryId }) => {
  const IconComponent = icon;
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  useEffect(() => {
    fetchCategories();
    if (id) {
      fetchItemDetails(id)
        .then(data => {
          setFormData(data);
          if (data.category) {
            setSelectedCategory(data.category);
          }
          if (data.subcategory) {
            setSelectedSubcategory(data.subcategory);
          }
        })
        .catch(error => {
          console.error('Error fetching item details:', error);
        });
    }
  }, [id]);

  useEffect(() => {
    if (categoryId) {
      setSelectedCategory(categoryId);
    }
  }, [categoryId]);

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
      setSelectedSubcategory('');
      setFormData({ ...formData, [id]: value, subcategory: '' });
    } else if (id === 'subcategory') {
      setSelectedSubcategory(value);
      setFormData({ ...formData, [id]: value });
    } else if (id === 'image') {
      setFormData({ ...formData, [id]: files[0] });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const validateForm = () => {
    const newErrors = [];
    fields.forEach(field => {
      if (!formData[field.id] && field.required) {
        newErrors.push(`${field.label} is required`);
      }
    });
    if (selectedCategory && type === 'edit_product' && !formData.subcategory) {
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
      onSubmit(formData, id); // Pass the item ID along with the form data
    }
  };

  const renderSelectOptions = (fieldId) => {
    if (fieldId === 'category') {
      return categories.map((category) => (
        <option key={category.value} value={category.value}>
          {category.label}
        </option>
      ));
    }
    if (fieldId === 'status') {
      return ['Active', 'Inactive'].map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ));
    }
    return null;
  };

  const renderSubcategoryOptions = () => {
    const selectedCategoryObj = categories.find(category => category.value === selectedCategory);
    if (selectedCategoryObj) {
      return selectedCategoryObj.subcategories.map((subcategory) => (
        <option key={subcategory.value} value={subcategory.value}>
          {subcategory.label}
        </option>
      ));
    }
    return null;
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
                  value={formData[field.id] || ''}
                >
                  <option value="">Select {field.label}</option>
                  {renderSelectOptions(field.id)}
                </select>
              ) : (
                <input
                  type={field.type}
                  id={field.id}
                  className="w-full border rounded px-3 py-2"
                  onChange={handleInputChange}
                  value={field.id !== 'image' ? formData[field.id] || '' : undefined}
                />
              )}
            </div>
          ))}
        </div>
        {type === 'edit_product' && selectedCategory && (
          <div className="mt-4">
            <label htmlFor="subcategory" className="block mb-1">Subcategory</label>
            <select
              id="subcategory"
              className="w-full border rounded px-3 py-2"
              onChange={handleInputChange}
              value={selectedSubcategory || ''}
            >
              <option value="">Select Subcategory</option>
              {renderSubcategoryOptions()}
            </select>
          </div>
        )}
        <div className="mt-8 flex justify-end">
          <button type="button" className="mr-6 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded" onClick={() => navigate('/products')}>
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

export default EditForm;
