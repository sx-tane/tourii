"use client";

import { type CartItem } from "@/types/interfaceProduct";
import React, {
  type ReactNode,
  createContext,
  useContext,
  useState,
} from "react";

interface CartContextProps {
  children: ReactNode;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<CartContextProps> = ({ children }) => {
  // Initialize cartItems from local storage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = global?.localStorage?.getItem("cartItems");
    if (storedCartItems) {
      return JSON.parse(storedCartItems) as CartItem[]; // Asserting the type to CartItem[]
    }
    return [];
  });

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems: CartItem[]) => {
      const newCartItems = [...prevItems, item];
      console.log("New cart items after adding:", newCartItems); // Log the new cart items
      global?.localStorage?.setItem("cartItems", JSON.stringify(newCartItems)); // Persist to localStorage
      return newCartItems;
    });
  };

  const value = {
    cartItems,
    addToCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
