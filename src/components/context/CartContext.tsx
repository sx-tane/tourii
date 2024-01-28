"use client";

import { type CartItem } from "@/types/interface";
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
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: CartItem) => {
    setCartItems((prevItems: CartItem[]) => [...prevItems, product]);
  };

  const value = {
    cartItems,
    addToCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
