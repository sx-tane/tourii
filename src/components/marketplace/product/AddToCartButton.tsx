import { type Product } from "@/types/interface";
import Link from "next/link";
import React from "react";

interface AddToCartButtonProps {
  product: Product;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  return (
    <div className="flex space-x-2">
      <button className="rounded-full border-[1.5px] border-red bg-transparent px-4 py-2 text-sm font-medium uppercase tracking-widest text-red transition-all duration-300 hover:bg-red hover:text-warmGrey">
        Add to Cart
      </button>
      <Link
        href={"/bonjin-bazaar"}
        className="rounded-full border-[1.5px] border-red bg-transparent px-4 py-2 text-sm font-medium uppercase tracking-widest text-red transition-all duration-300 hover:bg-red hover:text-warmGrey"
      >
        <div className="">bonjin bazaar</div>
      </Link>
    </div>
  );
};

export default AddToCartButton;
