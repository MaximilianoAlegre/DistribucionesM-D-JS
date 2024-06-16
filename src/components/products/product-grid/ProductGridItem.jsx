"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoCartOutline, IoEyeOutline } from "react-icons/io5";

const ProductGridItem = ({ product }) => {
  const [displayImage, setDisplayImage] = useState(product.images[0]);

  return (
    <div className="overflow-hidden fade-in w-[280px] h-[450] flex flex-col justify-between border-r border-t border-l border-gray-200">

      <Link href={`/product/${product.slug}`}>
        <Image
          src={`/products/${displayImage}`}
          alt={product.title}
          className="object-cover w-full"
          width={500}
          height={500}
          onMouseEnter={() => setDisplayImage(product.images[1])}
          onMouseLeave={() => setDisplayImage(product.images[0])}
        />
      </Link>
      
      <div className="p-4 flex flex-col">
        <Link href={`/product/${product.slug}`}><a className="hover:text-blue-600">{product.title}</a></Link>
        <span className="font-bold">${product.price}</span>
      </div>
      
      <div className="flex w-full justify-between">
        <button className="flex justify-center items-center space-x-1 border-b-2 border-azul p-2 w-full hover:bg-blue-400">
          <IoEyeOutline />
          <p className="text-xs">DETALLES</p>
        </button>
        {/* Divisor */}
        <div className="w-[1px] bg-black" />

        <button className="flex justify-center items-center space-x-1 border-b-2 border-azul p-2 w-full hover:bg-blue-400">
          <IoCartOutline />
          <p className="text-xs">COMPRAR</p>
        </button>
      </div>
    </div>
  );
};

export default ProductGridItem;
