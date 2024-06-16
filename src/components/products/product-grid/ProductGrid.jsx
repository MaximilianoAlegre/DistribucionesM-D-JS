import { ProductGridItem } from "./ProductGridItem";

const ProductGrid = ({ products }) => {
  return (
    <div className="flex flex-wrap justify-center lg:justify-between items-stretch gap-10">
      {products.map((product) => (
        <ProductGridItem key={product.slug} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
