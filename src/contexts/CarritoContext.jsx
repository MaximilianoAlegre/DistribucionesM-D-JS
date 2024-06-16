"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const CarritoContext = createContext();

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error("useCarrito debe ser usado dentro de un CarritoProvider");
  }
  return context;
};

export const CarritoProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");

  const addToCart = (product) => {
    const existingProduct = allProducts.find((item) => item.id === product.id);
    if (existingProduct) {
      const updatedProducts = allProducts.map((item) =>
        item.id === product.id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
      setTotal(total + product.price);
      setCountProducts(countProducts + 1);
      setAllProducts(updatedProducts);
    } else {
      product.quantity = 1;
      setTotal(total + product.price);
      setCountProducts(countProducts + 1);
      setAllProducts([...allProducts, product]);
    }
    setSuccessMessage("¡Su producto se agregó al carrito!");
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const removeFromCart = (product) => {
    const results = allProducts.filter((item) => item.id !== product.id);
    setAllProducts(results);
    setTotal(total - product.price * (product.quantity || 1));
    setCountProducts(countProducts - (product.quantity || 1));
  };

  const clearCart = () => {
    setAllProducts([]);
    setTotal(0);
    setCountProducts(0);
  };

  const decreaseQuantity = (product) => {
    const updatedProducts = allProducts.map((item) =>
      item.id === product.id && item.quantity && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setAllProducts(updatedProducts);
    setTotal(total - product.price);
    setCountProducts(countProducts - 1);
  };

  const clearSuccessMessage = () => {
    setSuccessMessage("");
  };

  const carritoContextValue = {
    allProducts,
    total,
    countProducts,
    addToCart,
    removeFromCart,
    clearCart,
    decreaseQuantity,
    successMessage,
    clearSuccessMessage,
  };

  return (
    <CarritoContext.Provider value={carritoContextValue}>
      {children}
    </CarritoContext.Provider>
  );
};
