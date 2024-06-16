'use client';
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { IoCartOutline, IoEyeOutline } from "react-icons/io5";
import { useCarrito } from '@/contexts/CarritoContext'; 

export const ProductCard = () => {
  const { addToCart } = useCarrito(); 

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [showCategories, setShowCategories] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const categoriesRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, categoryRes] = await Promise.all([
          fetch("/api/products"), 
          fetch("/api/category"),
        ]);
        const [productData, categoryData] = await Promise.all([
          productRes.json(),
          categoryRes.json(),
        ]);
        setProducts(productData);
        setCategories(categoryData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(event.target)
      ) {
        setShowCategories(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const onAddProduct = (product) => {
    addToCart(product);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };


  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 0 || product.categoryId === selectedCategory)
  );

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setShowCategories(false);
  };

  return (
    <div className="pl-2">
      <div className="md:flex md:space-x-3 items-center justify-end">
        <div>
          <input
            className="p-2 px-3 w-[230px] text-text2 font-thin focus:outline-none bg-gris"
            type="text"
            placeholder="Buscar producto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div
          className="relative my-5"
          ref={categoriesRef}
          onMouseEnter={() => setShowCategories(true)}
          onMouseLeave={() => setShowCategories(false)}
          onClick={() => setShowCategories(!showCategories)} 
        >
          <button className="p-3 text-text2 text-xs bg-gris w-[230px]">
            CATEGORÍAS
          </button>
          {showCategories && (
            <div className="w-[230px] absolute top-full left-0 bg-gris z-10">
              <button
                key="all"
                className="block w-full p-3 text-left text-xs hover:bg-gris1 text-text2"
                onClick={() => handleCategoryClick(0)}
              >
                TODAS LAS CATEGORÍAS
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  className="text-xs block w-full p-3 text-left hover:bg-gris1 text-text2"
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.name.toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap justify-center items-stretch gap-2 md:gap-5">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="overflow-hidden fade-in w-[175px] md:w-[280px] h-[270px] md:h-[450px] flex flex-col justify-between bg-gris"
          >
            <Link href={`/product/${product.id}`}>
              <div className="flex justify-center bg-white overflow-hidden items-center w-full h-[130px] md:h-[270px]">
                <img
                  src={product.image}
                  alt={product.title}
                  className="object-cover w-full"
                />
              </div>
            </Link>

            <div className="w-full h-full md:h-[180px] flex flex-col justify-between">
              <div className="md:p-4 flex flex-col">
                <Link href={`/product/${product.id}`}>
                  <p className="hover:text-blue-600 text-text1">{product.title}</p>
                </Link>
                <span className="font-bold text-text2">${product.price}</span>
              </div>

              <div className="flex w-full justify-between">
                <Link
                  href={`/product/${product.id}`}
                  className="flex justify-center items-center space-x-1 border-b-2 border-celeste p-2 w-full hover:bg-gris1"
                >
                  <IoEyeOutline className="text-text1"/>
                  <p className="hidden md:block text-xs text-text1">DETALLES</p>
                </Link>
                <div className="w-1 h-full bg-celeste"/>

                <button
                  onClick={() => onAddProduct(product)}
                  className="flex justify-center items-center space-x-1 border-b-2 border-celeste p-2 w-full hover:bg-gris1"
                >
                  <IoCartOutline className="text-text1"/>
                  <p className="text-xs hidden md:block text-text1">COMPRAR</p>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showSuccessMessage && (
        <div className="bg-green-500 text-white fixed bottom-5 right-5 p-4 rounded-lg">
          Producto agregado al carrito con éxito
        </div>
      )}
    </div>
  );
};
