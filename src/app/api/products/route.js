// api/products/route.js

import { NextResponse } from "next/server";
import { prisma } from "@/libs/db";

export async function GET() {
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
}

export async function POST(request) {
  try {
    const { description, image, inStock, price, title, categoryId } = await request.json();
    const newProduct = await prisma.product.create({
      data: {
        description,
        image,
        inStock: parseInt(inStock), // Convertir a entero si es necesario
        price: parseInt(price), // Convertir a entero si es necesario
        title,
        categoryId: parseInt(categoryId), // Convertir a entero si es necesario
      },
    });
    return NextResponse.json(newProduct);
  } catch (error) {
    return NextResponse.error(error.message, { status: 500 });
  }
}
