import { type Product } from "@/types/interface";
import Image from "next/image";
import React from "react";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="m-5 w-fit max-w-fit ">
      <div className="relative cursor-pointer">
        <div
          className="absolute right-2 ml-2 mt-2 w-fit border-[1.5px] p-1 text-xs font-bold uppercase tracking-widest text-warmGrey"
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
          className="z-30 h-64 w-52 object-cover"
        />
      </div>
      <div>
        <div className="mt-8 space-y-3 uppercase text-warmGrey3">
          <div className="w-52 overflow-hidden text-[12px] font-bold leading-normal tracking-widest">
            {product.name}
          </div>
          <div className="relative flex items-center justify-between">
            <div className="w-fit border-[1.5px] border-warmGrey3 bg-warmGrey3 p-1 text-[8px] font-bold tracking-widest text-charcoal  ">
              {product.category.productType}
            </div>
            <p className="text-right text-[12px] font-medium tracking-wider text-warmGrey3">{`${product.price} Yen`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
