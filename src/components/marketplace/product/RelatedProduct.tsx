import React from "react";
import ProductCard from "../storefront/ProductCard";
import { productsData } from "@/lib/data/marketplace/productData";
import Line from "@/components/about/divider-line/Line";

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
      <div className="relative -my-5 mx-auto flex w-6/12 items-center justify-center align-middle">
        <Line />
      </div>
      <h2 className="text-center text-3xl font-bold uppercase tracking-widest text-red">
        Engage in the Art of {bungoOnoArea}
      </h2>
      <div className="relative -my-5 mx-auto flex w-6/12 items-center justify-center align-middle">
        <Line />
      </div>
      <div className=" grid grid-cols-6">
        {displayedProducts.map((product) => (
          <ProductCard
            key={product.productId}
            product={product}
            textColor={"red"}
            productTypeTextColor={"warmGrey"}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
