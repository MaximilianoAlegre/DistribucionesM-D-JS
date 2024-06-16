import fetch from 'node-fetch';
import { NextRequest, NextResponse } from 'next/server';

const getProductsByTitle = async (title) => {
  try {
    const response = await fetch('http://localhost:3000/api/products');
    if (!response.ok) {
      throw new Error('Error al obtener los productos');
    }
    const allProducts = await response.json();

    // Normalizar el término de búsqueda a minúsculas
    const searchTermNormalized = title.toLowerCase();

    // Normalizar los títulos de los productos a minúsculas y buscar coincidencias
    const filteredProducts = allProducts.filter(product =>
      product.title.toLowerCase().includes(searchTermNormalized)
    );

    return filteredProducts;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};


export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title');

  if (!title) {
    return new NextResponse.JSON({ error: 'Invalid title parameter' }, { status: 400 });
  }

  try {
    const products = await getProductsByTitle(title);
    return new NextResponse.JSON(products, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return new NextResponse.JSON({ error: 'Error fetching products' }, { status: 500 });
  }
}
