import { useCart } from "@/components/context/CartContext";
import { Button } from "@/lib/ui/button";
import {
  type PurchaseData,
  type Product,
  type CartItem,
} from "@/types/interface";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

interface AddToCartButtonProps {
  product: Product;
  purchaseData: PurchaseData;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  purchaseData,
}) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const productWithDetails: CartItem = {
      product, // the product details
      purchaseData, // the purchase-specific details
    };
    addToCart(productWithDetails);
    toast("", {
      description: `${product.name} has been entrusted to your Kinchaku.`,
      style: {
        backgroundColor: "#21211b",
        color: "#e3e3dc",
      },
      // TODO: make this button sync to check out
      action: {
        label: "Kinchaku",
        onClick: () => {
          <Link href={"/bonjin-bazaar"}>bonjin bazaar</Link>;
        },
      },
    });

    console.log("Product with details:", productWithDetails);
  };

  return (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        onClick={handleAddToCart}
        className="rounded-full border-[1.5px] border-red bg-transparent px-4 py-2 text-sm font-medium uppercase tracking-widest text-red transition-all duration-300 hover:bg-red hover:text-warmGrey"
      >
        Add to Kinchaku
      </Button>
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
