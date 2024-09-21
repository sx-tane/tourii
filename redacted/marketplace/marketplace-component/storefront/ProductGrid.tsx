import React from "react";
import ProductCard from "./ProductCard";
import { type Product } from "@/types/interfaceProduct";

interface ProductGridProps {
  products: Product[];
  currentPage: number; // Added this prop to track page changes
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, currentPage }) => {
  return (
    <div
      key={currentPage} // Key change triggers the animation
      className="grid h-1/2 animate-fadeIn grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
    >
      {products.map((product) => (
        <ProductCard
          key={product.productId}
          product={product}
          textColor="warmGrey3"
          productTypeTextColor={"charcoal"}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
