"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CategoryButton from "@/components/CategoryButton/page";

const ProductsMaker = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    description: "",
    image: "",
    inStock: "",
    price: "",
    title: "",
    categoryId: null,
  });
  const [categories, setCategories] = useState([]);
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const apiUrlProducts = "/api/products";
  const apiUrlCategories = "/api/category";

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(apiUrlProducts);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(apiUrlCategories);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const addProduct = async () => {
    try {
      const response = await axios.post(apiUrlProducts, newProduct);
      setProducts([...products, response.data]);
      setNewProduct({
        description: "",
        image: "",
        inStock: 0,
        price: 0,
        title: "",
        categoryId: null,
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const updateProduct = async () => {
    try {
      const response = await axios.put(
        `${apiUrlProducts}/${currentProduct.id}`,
        newProduct
      );
      const updatedProducts = products.map((product) =>
        product.id === currentProduct.id ? response.data : product
      );
      setProducts(updatedProducts);
      setIsEditing(false);
      setNewProduct({
        description: "",
        image: "",
        inStock: 0,
        price: 0,
        title: "",
        categoryId: null,
      });
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`${apiUrlProducts}/${productId}`);
      const updatedProducts = products.filter(
        (product) => product.id !== productId
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleCategorySelect = (categoryId) => {
    const selectedCategory = categories.find(
      (category) => category.id === parseInt(categoryId)
    );
    setSelectedCategoryName(selectedCategory.name);
    setNewProduct({
      ...newProduct,
      categoryId: parseInt(categoryId),
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const startEditing = (product) => {
    setIsEditing(true);
    setCurrentProduct(product);
    setNewProduct({
      description: product.description,
      image: product.image,
      inStock: product.inStock,
      price: product.price,
      title: product.title,
      categoryId: product.categoryId,
    });
    const selectedCategory = categories.find(
      (category) => category.id === product.categoryId
    );
    setSelectedCategoryName(selectedCategory ? selectedCategory.name : "");
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setNewProduct({
      description: "",
      image: "",
      inStock: 0,
      price: 0,
      title: "",
      categoryId: null,
    });
    setSelectedCategoryName("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await updateProduct();
    } else {
      await addProduct();
    }
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-xl text-center font-bold text-text1 p-2">
        Administración de Productos
      </h2>
      {/* Formulario */}
      <div>
        <form
          className="bg-gris1 flex flex-col justify-center items-center my-5 p-5"
          onSubmit={handleFormSubmit}
        >
          <label htmlFor="title" className="text-text1 w-full">
            Título:
          </label>
          <input
            type="text"
            placeholder="Título del producto"
            name="title"
            value={newProduct.title}
            onChange={handleNewProductChange}
            className="mt-1 p-2 bg-gris text-text1 w-full"
          />
          <label htmlFor="description" className="text-text1 w-full">
            Descripción:
          </label>
          <input
            type="text"
            placeholder="Descripción del producto"
            name="description"
            value={newProduct.description}
            onChange={handleNewProductChange}
            className="mt-1 p-2 bg-gris text-text1 w-full"
          />
          <label htmlFor="Price" className="text-text1 w-full">
            Precio:
          </label>
          <input
            placeholder="$"
            name="price"
            value={newProduct.price}
            onChange={handleNewProductChange}
            className="mt-1 p-2 bg-gris text-text1 w-full"
          />
          <label htmlFor="number" className="text-text1 w-full">
            Stock <span className="text-celeste font-bold">Siempre colocar 1</span>
          </label>
          <input
            placeholder="Stock"
            name="inStock"
            value={newProduct.inStock}
            onChange={handleNewProductChange}
            className="mt-1 p-2 bg-gris text-text1 w-full"
          />
          <label htmlFor="image" className="text-text1 w-full">
            URL Imagen:
          </label>
          <input
            type="text"
            placeholder="URL Imagen"
            name="image"
            value={newProduct.image}
            onChange={handleNewProductChange}
            className="mt-1 p-2 bg-gris text-text1 w-full"
          />
          <div className="mt-1 w-full">
            <div className="my-2">
              <CategoryButton
                categories={categories}
                selectedCategoryId={newProduct.categoryId}
                onSelectCategory={handleCategorySelect}
              />
            </div>
          </div>
          <button type="submit" className="btn-put my-1">
            {isEditing ? "ACTUALIZAR" : "CREAR"}
          </button>
          {isEditing && (
            <button
              className="btn-delete my-1"
              type="button"
              onClick={cancelEditing}
            >
              CANCELAR
            </button>
          )}
        </form>
      </div>
      {/* Productos */}
      <div className="min-h-screen">
        <div className="mb-4 flex justify-center items-center">
          <input
            type="text"
            placeholder="Buscar producto..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-4 py-2 bg-gris text-text1 w-[300px]"
          />
        </div>
        <ul>
          {filteredProducts.map((product) => (
            <li
              key={product.id}
              className="p-1 my-2 md:flex justify-between items-center"
            >
              <div className="flex justify-center items-center space-x-3 py-5 md:py-0 p-2">
                <div className="bg-white">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-[50px] h-[50px] object-contain"
                  />
                </div>
                <div>
                  <span className="text-text1">{product.title}</span>
                </div>
              </div>
              <div className="flex justify-center items-center space-x-3">
                <button
                  onClick={() => startEditing(product)}
                  className="btn-primary"
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="btn-delete"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductsMaker;
