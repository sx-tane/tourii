import { type Product } from "@/types/interface";
import Image from "next/image";
import React from "react";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="w-fit max-w-fit cursor-pointer">
      <div className="relative">
        <div
          className="absolute right-2 ml-2 mt-2 w-fit border-[1.5px] p-1 text-xs font-medium uppercase tracking-widest text-warmGrey"
          style={{
            borderColor: product.category.bungoOnoAreaColor,
            backgroundColor: product.category.bungoOnoAreaColor,
          }}
        >
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
        <div className="my-10 space-y-3 uppercase text-warmGrey">
          <div className=" w-60 overflow-hidden text-sm font-bold leading-normal tracking-widest">
            {product.name}
          </div>
          <div className="relative flex  justify-between">
            <div className="w-fit border-[1.5px] border-warmGrey bg-warmGrey p-1 text-[9px] font-bold tracking-widest text-charcoal  ">
              {product.category.productType}
            </div>
            <p className="text-right text-sm font-medium tracking-wider text-warmGrey">{`${product.price} Yen`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
