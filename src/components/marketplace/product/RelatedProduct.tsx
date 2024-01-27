import React from "react";
import ProductCard from "../storefront/ProductCard";
import { productsData } from "@/lib/data/marketplace/productData";

interface RelatedProductsProps {
  bungoOnoArea: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ bungoOnoArea }) => {
  const filteredProducts = productsData.filter(
    (product) => product.category.bungoOnoArea === bungoOnoArea,
  );

  const displayedProducts = filteredProducts.slice(0, 6);

  return (
    <div>
      <h2 className="text-2xl font-bold">Related Products</h2>
      <div className=" grid grid-cols-6">
        {displayedProducts.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
