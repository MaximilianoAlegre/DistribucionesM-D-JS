"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const CategoryMaker = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [updateCategoryName, setUpdateCategoryName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const apiUrl = "/api/category";

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
      console.error("Error fetching categories:", error);
    }
  };

  // Función para agregar una nueva categoría
  const addCategory = async () => {
    try {
      const response = await axios.post(apiUrl, { name: newCategoryName });
      setCategories([...categories, response.data]);
      setNewCategoryName("");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  // Función para actualizar una categoría existente
  const updateCategory = async (categoryId, newName) => {
    try {
      const response = await axios.put(`${apiUrl}/${categoryId}`, { name: newName });
      const updatedCategories = categories.map((category) =>
        category.id === categoryId ? response.data : category
      );
      setCategories(updatedCategories);
      setUpdateCategoryName("");
      setSelectedCategoryId(null); // Limpiar la categoría seleccionada
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  // Función para eliminar una categoría
  const deleteCategory = async (categoryId) => {
    try {
      await axios.delete(`${apiUrl}/${categoryId}`);
      const updatedCategories = categories.filter(
        (category) => category.id !== categoryId
      );
      setCategories(updatedCategories);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // Función para manejar la selección de categoría para edición
  const selectCategoryForEdit = (categoryId) => {
    const selectedCategory = categories.find((category) => category.id === categoryId);
    if (selectedCategory) {
      setSelectedCategoryId(categoryId);
      setUpdateCategoryName(selectedCategory.name); // Poner el nombre actual en el campo de actualización
    }
  };

  // Función para manejar la cancelación de la edición
  const cancelEdit = () => {
    setSelectedCategoryId(null); // Limpiar la categoría seleccionada
    setUpdateCategoryName(""); // Limpiar el campo de nombre de actualización
  };

  // Función para manejar el cambio en el término de búsqueda
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtrar categorías en base al término de búsqueda
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold text-text1 h-full text-center p-2">
        ADMINISTRAR CATEGORÍAS
      </h2>

      <div>
        <input
          className="p-3 text-text2 bg-gris w-full"
          placeholder="Nombre de la categoría..."
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <button onClick={addCategory} className="btn-put my-5">CREAR CATEGORÍA</button>
      </div>

      <div className="mt-5">
        <input
          type="text"
          placeholder="Buscar categoría..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-3 text-text2 bg-gris w-full"
        />
      </div>

      <ul className="p-5">
        {filteredCategories.map((category) => (
          <li
            key={category.id}
            className="p-2 mt-1 flex justify-between items-center"
          >
            {selectedCategoryId === category.id ? (
              <input
                type="text"
                placeholder="Nuevo nombre"
                value={updateCategoryName}
                onChange={(e) => setUpdateCategoryName(e.target.value)}
                className="p-2 text-text2 bg-gris"
              />
            ) : (
              <div className="flex justify-center items-center space-x-3">
                <span>{category.id}</span>
                <span>{category.name}</span>
              </div>
            )}
            <div className="flex space-x-3">
              {selectedCategoryId === category.id ? (
                <>
                  <button
                    className="btn-put"
                    onClick={() => updateCategory(category.id, updateCategoryName)}
                  >
                    ACTUALIZAR
                  </button>
                  <button
                    className="btn-delete"
                    onClick={cancelEdit}
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn-put"
                    onClick={() => selectCategoryForEdit(category.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => deleteCategory(category.id)}
                  >
                    Eliminar
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryMaker;
