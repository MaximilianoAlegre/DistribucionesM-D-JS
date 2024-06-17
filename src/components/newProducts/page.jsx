"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IoCartOutline, IoEyeOutline } from "react-icons/io5";
import { useCarrito } from "@/contexts/CarritoContext";

export function NewProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const router = useRouter();
  const { addToCart } = useCarrito();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Error al obtener los productos");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
        setError("Error al obtener los productos");
      }
    };
    fetchProducts();
  }, []);

  const getLastMonthProducts = () => {
    const currentDate = new Date();
    const lastMonthDate = new Date();
    lastMonthDate.setMonth(currentDate.getMonth() - 1);

    const filteredProducts = products.filter((product) => {
      const productDate = new Date(product.createdat);
      return productDate > lastMonthDate;
    });

    return filteredProducts;
  };

  const lastMonthProducts = getLastMonthProducts();

  const onAddProduct = (product) => {
    addToCart(product);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <div className="flex justify-center items-center mt-4">
      <div className="w-full">
        <h1 className="font-bold text-2xl mb-4 text-text1">Novedades</h1>

        <ul className="flex flex-wrap justify-center items-stretch gap-5">
          {lastMonthProducts.map((product) => (
            <div
              key={product.id}
              className="w-[150px] md:w-[200px] h-[300px] md:h-[350px] flex flex-col justify-between bg-gris mt-5 md:mt-0"
            >
              <Link
                href={`/product/${product.id}`}
                className="bg-white w-full h-[60%] flex justify-center items-center overflow-hidden"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="object-contain w-full h-fit"
                />
              </Link>

              <div className="w-full md:h-[180px] flex flex-col justify-between h-[40%]">
                <div className="md:p-4 flex flex-col justify-between py-2 px-1 items-center h-full w-full">
                  <Link href={`/product/${product.id}`}>
                    <p className="hover:text-blue-600 text-text1 text-xs md:text-sm">
                      {product.title}
                    </p>
                  </Link>
                  <span className="font-bold text-text2">${product.price}</span>
                </div>

                <div className="flex w-full justify-between">
                  <Link
                    href={`/product/${product.id}`}
                    className="flex justify-center items-center space-x-1 border-b-2 border-celeste p-2 w-full hover:bg-gris1"
                  >
                    <IoEyeOutline className="text-text1" />
                    <p className="text-xs hidden md:block text-text1">
                      DETALLES
                    </p>
                  </Link>

                  <div className="w-1 h-full bg-celeste" />

                  <button
                    onClick={() => onAddProduct(product)}
                    className="flex justify-center items-center space-x-1 border-b-2 border-celeste p-2 w-full md:hover:bg-gris1"
                  >
                    <IoCartOutline className="text-text1" />
                    <p className="text-xs hidden md:block text-text1">
                      COMPRAR
                    </p>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </ul>

        {error && <span className="text-red-500 text-xs">{error}</span>}

        {/* Mensaje de producto agregado al carrito */}
        {showSuccessMessage && (
          <div className="bg-green-500 text-white fixed bottom-5 right-5 p-4 rounded-lg">
            Producto agregado al carrito con éxito
          </div>
        )}
      </div>
    </div>
  );
}
