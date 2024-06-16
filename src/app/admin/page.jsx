"use client";

import { Welcome } from "@/components/Welcome/page";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { BiSolidCategory } from "react-icons/bi";
import { signOut } from "next-auth/react";


const Admin = () => {
  return (
    <div>
      <div>
        <div>
          <Welcome />
        </div>
      </div>
      <div className="flex flex-wrap justify-center items-center w-full gap-5">
        <Link
          href={"/new"}
          className="bg-gris hover:bg-gris1 transition-all duration-300 w-[300px] h-[300px] flex flex-col justify-center items-center"
        >
          <div className="flex justify-center items-center">
            <FaShoppingCart className="text-text1" size={150} />
          </div>
          <div className="flex justify-center items-center text-text1">
            <h2>ADMINISTRAR PRODUCTOS</h2>
          </div>
        </Link>
        <Link
          href={"/newcategory"}
          className="bg-gris hover:bg-gris1 transition-all duration-300 w-[300px] h-[300px] flex flex-col justify-center items-center"
        >
          <div className="flex justify-center items-center">
            <BiSolidCategory className="text-text1"  size={150} />
          </div>
          <div className="flex justify-center items-center text-text1">
            <h2>ADMINISTRAR CATEGORÍAS</h2>
          </div>
        </Link>
        <button
          onClick={() => signOut()}
          className="bg-gris hover:bg-gris1 transition-all duration-300 w-[300px] h-[300px] flex flex-col justify-center items-center"
        >
          <div className="flex justify-center items-center text-text1">
            <IoLogOutOutline size={150} />
          </div>
          <div className="flex justify-center items-center text-text1">
            <h2>CERRAR ADMINISTRACIÓN</h2>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Admin;
