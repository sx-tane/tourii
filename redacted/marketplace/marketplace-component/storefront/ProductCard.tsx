import { type Product } from "@/types/interfaceProduct";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProductCardProps {
  product: Product;
  textColor: string;
  productTypeTextColor: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  textColor,
  productTypeTextColor,
}) => {
  const productNameForUrl = encodeURIComponent(product.productId);

  return (
    <div className="m-3 w-fit max-w-fit">
      <div className="relative cursor-pointer">
        <div
          className="absolute right-2 ml-2 mt-2 w-fit rounded-lg border-[1.5px] p-1 text-[10px] font-bold uppercase tracking-widest text-warmGrey"
          style={{
            borderColor: product.category.bungoOnoAreaColor,
            backgroundColor: product.category.bungoOnoAreaColor,
          }}
        >
          {product.category.bungoOnoArea}
        </div>
        <Link href={`/products/${productNameForUrl}`} className="h-60">
          <Image
            src={product.image ?? ""}
            alt={product.name}
            width={400}
            height={400}
            className="z-30 h-64 w-52 rounded-lg object-cover"
          />
        </Link>
      </div>
      <div>
        <div className={`mt-6 space-y-3 uppercase text-${textColor}`}>
          <div className="w-52 overflow-hidden text-[11px] font-bold leading-normal tracking-widest">
            {product.name}
          </div>
          <div className="relative flex items-center justify-between">
            <div
              className={`w-fit border-[1.5px] border-${textColor} bg-${textColor} rounded-3xl px-2 py-1 text-[8px] font-bold tracking-widest text-${productTypeTextColor}`}
            >
              {product.category.productType}
            </div>
            <p
              className={`text-right align-bottom text-[12px] font-medium tracking-wider text-${textColor}`}
            >{`${product.price} Yen`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
