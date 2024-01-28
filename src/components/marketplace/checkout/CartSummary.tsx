"use client";

import { useCart } from "@/components/context/CartContext";

const CartSummary: React.FC = () => {
  const { cartItems } = useCart();

  const totalPrice =
    cartItems?.reduce((total, item) => total + (item.product.price ?? 0), 0) ??
    0;

  return (
    <div>
      <h2>Cart Summary</h2>
      {cartItems?.map((item, index) => (
        <div key={index}>
          <p>
            {item.product.name} - ${item.product.price}
          </p>
          {/* Display other product details as needed */}
        </div>
      ))}
      <p>Total: {totalPrice} YEN</p>
      {/* Add checkout button or other components as needed */}
    </div>
  );
};

export default CartSummary;
