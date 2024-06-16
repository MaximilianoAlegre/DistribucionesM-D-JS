"use client";
import { notFound } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaStoreAlt } from "react-icons/fa";
import { useCarrito } from "@/contexts/CarritoContext";
import axios from "axios";

export default function SingleProductCasePage({ params }) {
  const { addToCart, successMessage, clearSuccessMessage } = useCarrito();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/products/${params.id}`);
        setProduct(res.data);
      } catch (error) {
        notFound();
      }
    };

    fetchData();
  }, [params.id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        clearSuccessMessage();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, clearSuccessMessage]);

  return (
    <div className="w-full md:flex justify-around items-center">
      <div className="flex justify-center items-center md:w-[60%] h-fit object-contain bg-white">
        <img
          src={product?.image}
          alt={product?.title}
          className="max-w-[600px] h-fit"
        />
      </div>
      <div className="w-full md:w-[40%] flex flex-col justify-between items-center mt-5 md:mt-0 md:p-10">
        <div className="w-full">
          <p className="text-2xl md:text-6xl font-thin text-text1 w-full">
            {product?.title}
          </p>
          <div className="mt-3">
            <span className="text-2xl text-text1 w-full py-3">
              ${product?.price}
            </span>
          </div>
        </div>
        <div className="my-5 w-full font-thin">
          <button className="btn-put" onClick={handleAddToCart}>
            AGREGAR AL CARRITO
          </button>
        </div>
        <div className="w-full">
          <h2 className="text-text1 py-3">DESCRIPCIÓN</h2>
          <p className="text-text2">{product?.description}</p>
        </div>
        <Link href={"/products"} className="btn-primary my-5">
          <FaStoreAlt />
          <p>SEGUIR COMPRANDO</p>
        </Link>
      </div>

      {/* Mensaje de éxito temporal */}
      {successMessage && (
        <div className="bg-green-500 text-white fixed bottom-5 right-5 p-4 rounded-lg">
          {successMessage}
        </div>
      )}
    </div>
  );
}
