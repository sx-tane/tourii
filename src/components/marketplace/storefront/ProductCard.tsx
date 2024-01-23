import { type Product } from "@/types/interface";
import Image from "next/image";
import React from "react";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="w-fit min-w-fit cursor-pointer">
      <div>
        <div className="absolute ml-2 mt-2 w-fit border-[1.5px] border-red  bg-red p-1 text-xs font-medium uppercase tracking-widest text-warmGrey ">
          {product.category.bungoOnoArea}
        </div>
        <Image
          src={product.image ?? ""}
          alt={product.name}
          width={400}
          height={400}
          className="z-30 h-72 w-60 object-cover"
        />
      </div>
      <div>
        <div className="mt-12 space-y-3 uppercase text-warmGrey">
          <div className="w-fit border-[1.5px] border-warmGrey p-1 text-[9px] font-bold tracking-widest  ">
            {product.category.productType}
          </div>
          <div className="mt-2 text-sm font-bold tracking-widest">
            {product.name}
          </div>
        </div>
        <p className=" mt-2 text-sm font-medium tracking-wider text-warmGrey">{`${product.price} Yen`}</p>{" "}
      </div>
    </div>
  );
};

export default ProductCard;
