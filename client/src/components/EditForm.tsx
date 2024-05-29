import React from 'react';
import { HiShoppingCart, HiTag, HiViewGrid } from 'react-icons/hi';

const EditForm = ({ title, fields, icon }) => {
  const IconComponent = icon; // Dynamically render the icon component

  return (
    <div className="p-4">
      <div className="flex items-center mb-6">
        <IconComponent className="mr-2 text-2xl" />
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {fields.map(field => (
          <div key={field.id}>
            <label htmlFor={field.id} className="block mb-1">{field.label}</label>
            {field.type === 'select' ? (
              <select id={field.id} className="w-full border rounded px-3 py-2">
                {field.options.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            ) : (
              <input type={field.type} id={field.id} className="w-full border rounded px-3 py-2" />
            )}
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-end">
        <button className="mr-6 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded">Cancel</button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Save</button>
      </div>
    </div>
  );
};

export default EditForm;
