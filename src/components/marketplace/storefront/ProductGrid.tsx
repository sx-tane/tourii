import React from "react";
import ProductCard from "./ProductCard";
import { type Product } from "@/types/interface";
import { motion, AnimatePresence } from "framer-motion";

interface ProductGridProps {
  products: Product[];
  currentPage: number; // Added this prop to track page changes
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, currentPage }) => {
  return (
    <div
      key={currentPage} // Key change triggers the animation
      className="grid grid-cols-1 items-center justify-center align-middle sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {products.map((product) => (
        <ProductCard key={product.productId} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
