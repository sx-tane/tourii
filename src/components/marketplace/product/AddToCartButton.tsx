import { type Product } from "@/types/interface";
import React from "react";

interface AddToCartButtonProps {
  product: Product;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  return (
    <button className="rounded-full border-[1.5px] border-red bg-transparent px-4 py-2 text-sm font-medium uppercase tracking-widest text-red transition-all duration-300 hover:bg-red hover:text-warmGrey">
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
