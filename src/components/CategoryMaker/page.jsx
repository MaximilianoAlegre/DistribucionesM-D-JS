"use client"
// components/CategoriesComponent.js

// components/CategoryMaker.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryMaker = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [updateCategoryName, setUpdateCategoryName] = useState('');

  const apiUrl = '/api/category';

  // Función para cargar las categorías al cargar el componente
  useEffect(() => {
    fetchCategories();
  }, []);

  // Función para obtener todas las categorías
  const fetchCategories = async () => {
    try {
      const response = await axios.get(apiUrl);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Función para agregar una nueva categoría
  const addCategory = async () => {
    try {
      const response = await axios.post(apiUrl, { name: newCategoryName });
      setCategories([...categories, response.data]);
      setNewCategoryName('');
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  // Función para actualizar una categoría existente
  const updateCategory = async (categoryId) => {
    try {
      const response = await axios.put(`${apiUrl}/${categoryId}`, { name: updateCategoryName });
      const updatedCategories = categories.map(category =>
        category.id === categoryId ? response.data : category
      );
      setCategories(updatedCategories);
      setUpdateCategoryName('');
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  // Función para eliminar una categoría
  const deleteCategory = async (categoryId) => {
    try {
      await axios.delete(`${apiUrl}/${categoryId}`);
      const updatedCategories = categories.filter(category => category.id !== categoryId);
      setCategories(updatedCategories);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  // Función para manejar la selección de categoría
  const handleCategorySelect = (categoryId) => {
    onSelectCategory(categoryId);
  };

  return (
    <div className='text-white'>
      <h2>Categories</h2>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            {category.name}
            <button onClick={() => updateCategory(category.id)}>Update</button>
            <button onClick={() => deleteCategory(category.id)}>Delete</button>
            <button onClick={() => handleCategorySelect(category.id)}>Select</button>
          </li>
        ))}
      </ul>
      <div>
        <input
        className='text-black'
          type="text"
          placeholder="New category name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <button onClick={addCategory}>Add Category</button>
      </div>
      {updateCategoryName && (
        <div>
          <input
            type="text"
            placeholder="Update category name"
            value={updateCategoryName}
            onChange={(e) => setUpdateCategoryName(e.target.value)}
          />
          <button onClick={() => updateCategory(updateCategoryName)}>Update</button>
        </div>
      )}
    </div>
  );
};

export default CategoryMaker;
